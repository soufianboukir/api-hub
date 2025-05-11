import { auth } from '@/auth';
import { ApiCard } from '@/components/client/ApiCard';
import { UploadProfileImages } from '@/components/client/UploadProfileImages';
import { Button } from '@/components/ui/button';
import { fetchUserData } from '@/services/users';
import { SquarePen } from 'lucide-react';
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
        <div className="p-4 w-[100%]">
            <UploadProfileImages user={data.user} isOwner={isOwner}/>

            <br />
            <br />
            <br />

            <div className='flex gap-5 items-center'>
                <h1 className="text-2xl font-bold mt-4">{data.user.username}</h1>
                {
                    isOwner && (
                        <div className='w-10 h-10 rounded-sm mt-4 duration-100 hover:bg-gray-100 cursor-pointer flex justify-center items-center'>
                            <Link href={'/user/settings'}>
                                <SquarePen className='text-gray-700'/>
                            </Link>
                        </div>
                    )
                }
            </div>

            <div className='mt-5'>
                <h1 className='text-xl font-semibold'>Published APIs</h1>
                <hr className='w-[11%] border border-blue-400'/>
            </div>

            <div className='flex justify-center'>
                <div className='mt-10'>
                    <Button className='bg-blue-500 hover:bg-blue-700 cursor-pointer'>
                        Publish API
                    </Button>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 gap-2 mt-6'>
                <ApiCard />
                <ApiCard />
                <ApiCard />
                <ApiCard />
                <ApiCard />
            </div>
        </div>
    )
}

export default page
