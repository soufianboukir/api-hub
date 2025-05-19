import { auth } from '@/auth';
import { UploadProfileImages } from '@/components/client/UploadProfileImages';
import UserApis from '@/components/client/UserApis';
import { fetchUserData } from '@/services/users';
import { SquarePen, SquarePlus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

interface UserProfilePageProps {
    params : {
        username: string
    }
}

export async function generateMetadata({params}:UserProfilePageProps):Promise<Metadata> {
    const { username } = await params;
    return {
        title : username,
    }
}

async function page({params}:UserProfilePageProps) {
    const { username } = params;
    const data = await fetchUserData(username);
    const loggedInUser = await auth();
    const isOwner = loggedInUser?.user.username === username;

    if(!data.user){
        redirect(`/user-not-found?username=${username}`);
    }
    
    return (
        <div className="w-full px-6 py-8 light:bg-white rounded-lg shadow-sm">
            <UploadProfileImages user={data.user} isOwner={isOwner} />

            <div className="mt-20 flex items-center justify-between flex-wrap">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.user.username}</h1>
                
                {isOwner && (
                    <div className="flex gap-3">
                        <Link
                        href="/user/settings"
                        className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition"
                        >
                        <SquarePen className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                        <span className="text-sm text-gray-700 dark:text-gray-200 hidden sm:inline">Edit Profile</span>
                        </Link>

                        <Link
                        href={`/user/${username}/publishApi`}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-md transition"
                        >
                        <SquarePlus className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                        <span className="text-sm text-blue-700 dark:text-blue-300 hidden sm:inline">Publish API</span>
                        </Link>
                    </div>
                )}
            </div>

            <div className="mt-10">
                <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Published APIs</h2>
                </div>
                <hr className="w-32 border-t-2 border-blue-500" />
            </div>

            <div className="mt-6">
                <UserApis username={username} isOwner={isOwner} />
            </div>
        </div>
    )
}

export default page
