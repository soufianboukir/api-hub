import React from 'react';
import { Bell, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const notifications = [
  {
    _id: '1',
    fromUser: {
      _id: 'user1',
      name: 'John Doe',
      avatar: '/avatars/user1.jpg'
    },
    toUser: 'currentUser',
    message: 'commented on your post',
    url: '/posts/123',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    _id: '2',
    fromUser: {
      _id: 'user2',
      name: 'Alice Smith',
      avatar: '/avatars/user2.jpg'
    },
    toUser: 'currentUser',
    message: 'liked your photo',
    url: '/photos/456',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    _id: '3',
    fromUser: {
      _id: 'user3',
      name: 'Bob Johnson',
      avatar: '/avatars/user3.jpg'
    },
    toUser: 'currentUser',
    message: 'mentioned you in a comment',
    url: '/posts/789',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
];

// Helper function to format time
const formatTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

// // Notification Popover Component
// export const NotificationPopover = () => {
//   const unreadCount = notifications.filter(n => !n.isRead).length;
  
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative rounded-full">
//           <Bell className="w-5 h-5" />
//           {unreadCount > 0 && (
//             <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//               {unreadCount}
//             </span>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-96 p-0 rounded-xl" align="end">
//         <div className="border-b p-4">
//           <div className="flex items-center justify-between">
//             <h4 className="font-semibold">Notifications</h4>
//             <Button variant="ghost" size="sm" className="text-primary text-sm h-8">
//               Mark all as read
//             </Button>
//           </div>
//         </div>
//         <div className="max-h-[400px] overflow-y-auto">
//           {notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <Link 
//                 key={notification._id} 
//                 href={notification.url}
//                 className={cn(
//                   "flex items-start gap-3 p-4 border-b hover:bg-muted transition-colors",
//                   !notification.isRead && "bg-blue-50/50 dark:bg-blue-900/10"
//                 )}
//               >
//                 <Avatar className="h-9 w-9">
//                   <AvatarImage src={notification.fromUser.avatar} />
//                   <AvatarFallback>{notification.fromUser.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-medium">
//                       {notification.fromUser.name} {notification.message}
//                     </p>
//                     {!notification.isRead && (
//                       <span className="h-2 w-2 rounded-full bg-blue-500"></span>
//                     )}
//                   </div>
//                   <div className="flex items-center mt-1 text-xs text-muted-foreground">
//                     <Clock className="h-3 w-3 mr-1" />
//                     {formatTime(notification.createdAt)}
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <div className="p-6 text-center text-muted-foreground">
//               No notifications yet
//             </div>
//           )}
//         </div>
//         <div className="p-3 text-center border-t">
//           <Link href="/notifications" className="text-sm font-medium text-primary">
//             View all notifications
//           </Link>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// Full Notifications Page Component
const NotificationsPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button variant="ghost" className="text-primary">
                Mark all as read
            </Button>
        </div>
      
        <div className="space-y-2">
            {notifications.length > 0 ? (
            notifications.map((notification) => (
                <Link
                key={notification._id}
                href={notification.url}
                className={cn(
                    "flex items-start gap-4 p-4 rounded-lg border hover:bg-muted transition-colors",
                    !notification.isRead && "bg-blue-50/50 dark:bg-blue-900/10"
                )}
                >
                <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.fromUser.avatar} />
                    <AvatarFallback>{notification.fromUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="font-medium">
                            {notification.fromUser.name} {notification.message}
                        </p>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(notification.createdAt)}
                    </div>
                </div>
                </Link>
            ))
            ) : (
            <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Bell className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-muted-foreground">When you get notifications, they will appear here</p>
            </div>
            )}
        </div>
    </div>
  );
};

export default NotificationsPage;