'use client'

import { getUnseenMessages } from '@/services/messages';
import { Mail } from 'lucide-react'
import Link from 'next/link';
import { useEffect, useState } from 'react'

export const MessagesIcon = () => {
    const [unseenMessages,setUnseenMessages] = useState<number>(0);

    useEffect(() =>{
        const fetchUnseenMssgs = async () =>{
            const response = await getUnseenMessages();
            console.log(response);
            
            if(response.status === 200){
                setUnseenMessages(response.data.unseenMessages)
            }
        }
        fetchUnseenMssgs();
    },[])

    return (
        <Link href="/inbox" className="flex flex-row gap-2 items-center font-semibold text-gray-800 dark:text-gray-200">
            <div className="relative">
                <Mail className="w-5 h-5" />
                    {unseenMessages > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {unseenMessages}
                        </div>
                    )}
            </div>
            <span>Inbox</span>
            <span className='text-sm text-blue-600'>Not available yet</span>
        </Link>
    )
}
