'use client'

import { updateUserProfile } from '@/services/users'
import Image from 'next/image'
import React from 'react'

type User = {
    profile_picture?: string,
    bg_picture?: string,
    name: string,
    username: string,
    defaultColor: string
}


export const UploadProfileImages = ({user} : {user: User}) => {

    const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'bakground') =>{
        const file = e.target.files?.[0];
        if(!file){
            return;
        }

        const formData = new FormData();
        formData.append('username',user.username);
        formData.append('type',type);
        formData.append('file',file);

        const response = await updateUserProfile(formData);
        console.log(response);
        
    }

    return (
        <div className="w-full relative">
            <div className="relative group">
                {
                    user.bg_picture ? (
                        <Image
                            src={user.bg_picture}
                            alt="user background"
                            className="w-full h-[200px] object-cover border border-gray-200 rounded-md shadow-lg"
                        />
                    ) : (
                        <div className={`w-full h-[200px] border border-gray-200 rounded-md shadow-lg ${user.defaultColor}`}></div>
                    )
                }

                <label className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-md">
                    <input type="file" hidden onChange={(e) => handleUpload(e,'bakground')}/>
                    <span className="text-white font-semibold">Change Background</span>
                </label>
            </div>

            <div className='absolute left-20 top-28'>
                <div className="relative group">
                    {
                        user.profile_picture ? (
                            <Image
                                src={user.profile_picture}
                                alt="user profile"
                                className="w-40 h-40 object-cover border-2 border-gray-200 rounded-full shadow-lg"
                            />
                        ) : (
                            <div className={`w-40 h-40 flex justify-center items-center text-white text-5xl font-semibold rounded-full border-2 border-gray-200 shadow-lg ${user.defaultColor}`}>
                                {user.username[0].toUpperCase()}
                            </div>
                        )
                    }

                    <label className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                        <input type="file" hidden onChange={(e) => handleUpload(e,'profile')}/>
                        <span className="text-white font-semibold text-sm">Change Photo</span>
                    </label>
                </div>
            </div>
        </div>
    )
}
