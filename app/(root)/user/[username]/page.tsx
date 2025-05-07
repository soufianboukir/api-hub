import { fetchUserData } from '@/services/users';
import { SquarePen } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
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
    console.log(data);
    
    
    // const userAPIs = fetchUserAPIs();

    if(!data.user){
        redirect(`/user-not-found?username=${username}`);
    }

    return (
        <div className="p-4 w-[100%]">
            <div className="w-[100%] relative">
                {
                    data.user.bg_picture ? (
                        <Image
                            src={data.user.bg_picture ? data.user.bg_picture : null}
                            alt="user background"
                            className={`w-[100%] h-[200px] object-cover border border-gray-200 rounded-md shadow-lg`}
                        />
                    ) : (
                        <div className={`w-[100%] h-[200px] object-cover border border-gray-200 rounded-md shadow-lg ${data.user.defaultColor}`}>
                            
                        </div>
                    )
                }

                <div className='absolute left-20 top-28'>
                    {
                        data.user.profile_picture ? (
                            <Image
                                src={data.user.profile_picture ? data.user.profile_picture : null}
                                alt="user profile picture"
                                className={`w-[100%] h-[200px] object-cover border border-gray-200 rounded-md shadow-lg`}
                            />
                        ) : (
                            <div className={`w-40 flex justify-center items-center text-white font-semibold text-5xl rounded-full h-40 object-cover border-2 border-gray-200 shadow-lg ${data.user.defaultColor}`}>
                                {
                                    data.user.username[0].toUpperCase()
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <br />
            <br />
            <br />

            <div className='flex gap-5 items-center'>
                <h1 className="text-2xl font-bold mt-4">{data.user.username}</h1>
                <div className='w-10 h-10 rounded-sm mt-4 duration-100 hover:bg-gray-100 cursor-pointer flex justify-center items-center'>
                    <Link href={'/user/settings'}>
                        <SquarePen className='text-gray-700'/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
