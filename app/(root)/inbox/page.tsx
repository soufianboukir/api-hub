'use client'

import { useEffect, useRef, useState } from 'react';
import { getConversations } from '@/services/conversations';
import { getMessages } from '@/services/messages';
import { toast } from 'sonner';
import { Conversation, Message } from '@/interfaces/conv-mssg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Search, Send, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/Loading';
import { UserI } from '@/models/user.model';

export default function ConversationsPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [otherParticipant,setOtherParticipant] = useState<UserI>();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {data: session, status} = useSession();

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
      if (!newMessage.trim()) return;
      const newMsg: Message = {
        _id: String(Date.now()),
        text: newMessage,
        sender: { name: 'Me' },
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
      scrollToBottom();
    };    

    useEffect(() => {
      const fetchConversations = async () => {
        try {
          const response = await getConversations();
          if (response.status === 200) {
            setConversations(response.data.conversations);
            const first = response.data.conversations[0];
            setSelectedConversation(first);
          }
        } catch {
          toast.error('Operation failed', {
            description: 'Failed to load your conversations',
          });
        }
      };
      fetchConversations();
    }, []);

    useEffect(() => {
      const fetchMessages = async () => {
        if (!selectedConversation) return;
        try {
          setOtherParticipant(selectedConversation.participants.find((p) => p.email !== session?.user?.email))
          const response = await getMessages(selectedConversation._id);
          if (response.status === 200) {
            setMessages(response.data.messages);
            scrollToBottom();
          }
        } catch {
          toast.error('Operation failed', {
            description: 'Failed to load your messages',
          });
        }
      };
      fetchMessages();
    }, [selectedConversation]);

    if(status === 'loading') return <Loading />

    return (
      <div className="flex h-[85vh] bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold">Messages</h2>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {conversations.map((conv) => {
                const participant = conv.participants.find((p) => p.email !== session?.user?.email);

                return (
                  <div
                    key={conv._id}
                    className={cn(
                      'flex items-center p-4 gap-3 cursor-pointer transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                      selectedConversation?._id === conv._id && 'bg-blue-100/30 dark:bg-blue-800/30 border-l-4 border-blue-500'
                    )}
                    onClick={() => setSelectedConversation(conv)}
                  >
                    <Avatar className="w-12 h-12 shadow-md ring-2 ring-blue-300 dark:ring-blue-600">
                      {participant?.profile_picture ? (
                        <Image
                          src={participant.profile_picture}
                          alt="User profile"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div className={`${participant?.defaultColor} text-xl w-12 h-12 text-white rounded-full flex justify-center items-center`}>
                          {participant?.username.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold truncate">{participant?.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{conv.lastMessage}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-2/3 flex flex-col">
            {selectedConversation && (
              <>
                <div className="flex items-center justify-between w-full border-b border-gray-200 dark:border-gray-800 p-4">
                  <div className='flex gap-4'>
                    <Avatar className="w-12 h-12 shadow-md ring-2 ring-blue-300 dark:ring-blue-600">
                      {otherParticipant?.profile_picture ? (
                        <Image
                          src={otherParticipant.profile_picture}
                          alt="User profile"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div className={`${otherParticipant?.defaultColor} text-xl w-12 h-12 text-white rounded-full flex justify-center items-center`}>
                          {otherParticipant?.username.charAt(0)}
                        </div>
                      )}
                    </Avatar>

                    <div className="flex-1">
                      <div className="font-semibold text-lg">
                        {otherParticipant?.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last active{' '}
                        {selectedConversation?.updatedAt
                          ? formatDistanceToNow(new Date(selectedConversation.updatedAt), {
                              addSuffix: true,
                            })
                          : 'unknown'}
                      </div>
                    </div>
                  </div>
                  

                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/dark-cubes.png')] bg-opacity-5 custom-scrollbar">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={cn('flex transition-all duration-200', msg.sender.name === 'Me' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-sm p-4 rounded-2xl shadow transition-all duration-200',
                          msg.sender.name === 'Me'
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'
                        )}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <div
                          className={cn(
                            'text-xs mt-2 opacity-70',
                            msg.sender.name === 'Me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          )}
                        >
                          {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
                  <div className="flex gap-3 items-center">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 border-none px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <Button
                      onClick={sendMessage}
                      className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition disabled:opacity-50"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
  );
}
