'use client'

import { useEffect, useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { MoreVertical, Search, Send } from 'lucide-react';
import { getConversations } from '@/services/conversations';

const testConversations = [
  {
    id: '1',
    username: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hey! How are you?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
    unread: 2,
    messages: [
      { 
        sender: 'John Doe', 
        content: 'Hey there! Just wanted to check how you were doing with the project.', 
        createdAt: new Date(Date.now() - 1000 * 60 * 30) 
      },
      { 
        sender: 'Me', 
        content: "Hi John! I'm making good progress. Should have the first draft ready by Friday.", 
        createdAt: new Date(Date.now() - 1000 * 60 * 25) 
      },
      { 
        sender: 'John Doe', 
        content: 'That sounds great! Let me know if you need any help.', 
        createdAt: new Date(Date.now() - 1000 * 60 * 5) 
      },
    ],
  },
  {
    id: '2',
    username: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Are we meeting tomorrow?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
    messages: [
      { 
        sender: 'Jane Smith', 
        content: 'Are we meeting tomorrow for the client presentation?', 
        createdAt: new Date(Date.now() - 1000 * 60 * 60) 
      },
      { 
        sender: 'Me', 
        content: 'Yes, at 10 AM in the conference room. I sent you the agenda already.', 
        createdAt: new Date(Date.now() - 1000 * 60 * 45) 
      },
      { 
        sender: 'Jane Smith', 
        content: 'Perfect! I just reviewed the materials. Looking forward to it.', 
        createdAt: new Date(Date.now() - 1000 * 60 * 30) 
      },
    ],
  },
  {
    id: '3',
    username: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'The design files are ready for review',
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
    unread: 1,
    messages: [
      { 
        sender: 'Alex Johnson', 
        content: 'Just uploaded the latest design files to the shared folder.', 
        createdAt: new Date(Date.now() - 1000 * 60 * 150) 
      },
      { 
        sender: 'Alex Johnson', 
        content: 'Let me know your thoughts when you get a chance to review them.', 
        createdAt: new Date(Date.now() - 1000 * 60 * 120) 
      },
    ],
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(testConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations,setConversations] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchConversations = async () =>{
    try{
      const response = await getConversations();
      console.log(response)
      if(response.status === 200){
        setConversations(response.data.conversations)
      }
    }catch{

    }finally{
      setLoading(false)
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversation = {
        ...selectedConversation,
        messages: [
          ...selectedConversation.messages,
          {
            sender: 'Me',
            content: newMessage,
            createdAt: new Date(),
          },
        ],
        lastMessage: newMessage,
        updatedAt: new Date(),
      };

      setSelectedConversation(updatedConversation);
      setNewMessage('');
    }
  };

  useEffect(() =>{
    fetchConversations();
  },[])

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
          {testConversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                'flex items-center p-4 gap-3 cursor-pointer transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                conv.id === selectedConversation.id &&
                  'bg-blue-100/30 dark:bg-blue-800/30 border-l-4 border-blue-500'
              )}
              onClick={() => setSelectedConversation(conv)}
            >
              <Avatar className="w-12 h-12 shadow-md ring-2 ring-blue-300 dark:ring-blue-600">
                <img src={conv.avatar} alt={conv.username} className="rounded-full" />
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{conv.username}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(conv.updatedAt, { addSuffix: true })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {selectedConversation && (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-800 p-4 gap-3 bg-white dark:bg-gray-900 shadow-sm">
              <Avatar className="w-10 h-10">
                <img src={selectedConversation.avatar} alt={selectedConversation.username} className="rounded-full" />
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-lg">{selectedConversation.username}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last active {formatDistanceToNow(selectedConversation.updatedAt, { addSuffix: true })}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] 
              dark:bg-[url('https://www.transparenttextures.com/patterns/dark-cubes.png')] bg-opacity-5 custom-scrollbar"
            >
              {selectedConversation.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex transition-all duration-200',
                    msg.sender === 'Me' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-sm p-4 rounded-2xl shadow transition-all duration-200',
                      msg.sender === 'Me'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'
                    )}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                    <div
                      className={cn(
                        'text-xs mt-2 opacity-70',
                        msg.sender === 'Me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      )}
                    >
                      {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
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