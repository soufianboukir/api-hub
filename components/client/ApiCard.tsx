'use client'

import Image from 'next/image'
import React from 'react'
import { Bolt, Heart, HeartOff } from 'lucide-react'
import { SimplifiedApi } from '@/interfaces/api'
import { formatDate } from '@/lib/formatDate'
import Link from 'next/link'
import { favoriteApi, unfavoriteApi } from '@/services/apis'
import { toast } from 'sonner'

interface ApiCardProps {
    api: SimplifiedApi,
    isOwner: boolean,
    isOnFavoritePage?: boolean,
    favorite_id?: string,
}

export const ApiCard = ({api,isOwner,isOnFavoritePage,favorite_id} : ApiCardProps) => {
    const favoriteThisApi = () =>{
        toast.promise(favoriteApi(api._id),{
            loading: 'Loading...',
            success:(response) => response.data.message,
            error: (err) => err.response.data.message
        })
    }

    const unFavoriteThisApi = () =>{
        toast.promise(unfavoriteApi(favorite_id!),{
            loading: 'Loading...',
            success:(response) => response.data.message,
            error: (err) => err.response.data.message
        })
    }

    return (
        <div className='px-5 py-3 shadow-sm border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 duration-100 bg-white dark:bg-gray-900'>
            <div className='flex items-center justify-between'>
                <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-md'>
                    {api.category.name}
                </span>

                <div className='flex gap-2'>
                    {isOwner && (
                        <Link href={`/user/${api.author.username}/editApi/${api._id}`}>
                            <Bolt className='w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300' />
                        </Link>
                    )}
                    {
                        isOnFavoritePage ?
                            <HeartOff className='w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300' onClick={unFavoriteThisApi}/>
                        : <Heart className='w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300' onClick={favoriteThisApi}/>
                    }
                        
                </div>
            </div>

            <div className="flex items-start gap-4 mt-4">
                <div className="flex-shrink-0">
                    <Image
                        src={api.avatar}
                        alt="API image"
                        width={60}
                        height={60}
                        className="rounded-full object-cover w-[60px] h-[60px]"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white hover:underline hover:text-blue-600 duration-200">
                        <Link href={`/api/${api._id}`}>
                            {api.title.length > 30 ? `${api.title.substring(0, 30)}...` : api.title}
                        </Link>
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {api.description.length > 60 ? `${api.description.substring(0, 60)}...` : api.description}
                    </p>
                </div>
            </div>

            <br />
            <div className='flex justify-between text-gray-500 dark:text-gray-400'>
                <span>
                    By <Link href={`/user/${api.author.username}`} className="hover:underline">{api.author.username}</Link>
                </span>
                <span>Updated {formatDate(api.updatedAt)}</span>
            </div>
        </div>
    )
}
