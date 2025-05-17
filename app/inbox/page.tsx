'use client'

import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { formatDistanceToNow } from 'date-fns';

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
          }
        ],
        lastMessage: newMessage,
        updatedAt: new Date(),
      };
      
      // Update the conversation in the list
      const updatedConversations = testConversations.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      );
      
      setSelectedConversation(updatedConversation);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold">Messages</h2>
          <div className="relative mt-4">
            <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-gray-100 dark:bg-gray-800 border-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {testConversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                'flex items-center p-4 gap-3 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50',
                conv.id === selectedConversation.id && 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500'
              )}
              onClick={() => setSelectedConversation(conv)}
            >
              <Avatar className="w-12 h-12">
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Panel */}
      <div className="w-2/3 flex flex-col bg-gray-50 dark:bg-gray-950">
        {selectedConversation && (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-800 p-4 gap-3 bg-white dark:bg-gray-900">
              <Avatar className="w-10 h-10">
                <img 
                  src={selectedConversation.avatar} 
                  alt={selectedConversation.username} 
                  className="rounded-full" 
                />
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{selectedConversation.username}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last active {formatDistanceToNow(selectedConversation.updatedAt, { addSuffix: true })}
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Icons.moreVertical className="h-5 w-5" />
              </Button>
            </div>

            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] 
              dark:bg-[url('https://www.transparenttextures.com/patterns/dark-cubes.png')] bg-opacity-5"
            >
              {selectedConversation.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex max-w-3/4 transition-all duration-200',
                    msg.sender === 'Me' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'p-4 rounded-2xl shadow-sm transition-all duration-200',
                      msg.sender === 'Me'
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none shadow'
                    )}
                  >
                    <p>{msg.content}</p>
                    <div className={cn(
                      "text-xs mt-1 opacity-70",
                      msg.sender === 'Me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    )}>
                      {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
              <div className="flex gap-2 items-center">
                <Button variant="ghost" size="icon">
                  <Icons.plus className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icons.image className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 border-none"
                />
                <Button 
                  onClick={sendMessage} 
                  className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={!newMessage.trim()}
                >
                  <Icons.send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}