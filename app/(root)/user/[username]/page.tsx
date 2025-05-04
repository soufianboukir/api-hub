import { fetchUserData } from '@/services/users';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
    const response = await fetchUserData(username);
    console.log(response);
    
    // const userAPIs = fetchUserAPIs();

    if(response.status !== 200){
        notFound();
    }

    return (
        <div>
            THIS IS THS PAGE
        </div>
    )
}

export default page
