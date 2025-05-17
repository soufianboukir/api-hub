'use client'

import { Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const notifications = [
  {
    title: "API Purchased",
    message: "JohnDoe bought your Weather API.",
    time: "2 mins ago",
    read: false
  },
  {
    title: "New Review",
    message: "Your Currency API got a 5-star rating!",
    time: "10 mins ago",
    read: false
  },
  {
    title: "Usage Alert",
    message: "You're at 90% of your API limit.",
    time: "1 hour ago",
    read: true
  },
];

export default function Notifications() {
    const [notifications,setNotifications] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() =>{
        const fetchNotifications = () =>{
            
        } 
    },[])
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
        </PopoverTrigger>
        <PopoverContent 
            className="w-96 p-0 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
            align="end"
        >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-t-xl border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Notifications</h4>
                <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                    Mark all as read
                </span>
            </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif, idx) => (
                <div
                key={idx}
                className={cn(
                    "p-4 border-b border-gray-100 dark:border-gray-800 transition-all",
                    "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                    "flex gap-3 items-start",
                    !notif.read && "bg-blue-50/50 dark:bg-blue-900/10"
                )}
                >
                    <div className="flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h5 className="text-sm font-semibold">{notif.title}</h5>
                            {notif.read && (
                                <Check className="w-3 h-3 text-green-500" />
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
                    </div>
                </div>
            ))}
            </div>
            <div className="p-3 text-center bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
                <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                    View all notifications
                </span>
            </div>
        </PopoverContent>
    </Popover>
  );
}