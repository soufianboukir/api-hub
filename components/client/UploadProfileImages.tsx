'use client'

import { UserI } from '@/models/user.model'
import { updateUserProfile } from '@/services/users'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'



export const UploadProfileImages = ({user,isOwner} : {user: UserI, isOwner: boolean}) => {    
    const [currentUser,setCurrentUser] = useState(user);
    const { update } = useSession();
    const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'background') =>{
        const file = e.target.files?.[0];
        if(!file){
            return;
        }

        const formData = new FormData();
        formData.append('username',user.username);
        formData.append('type',type);
        formData.append('file',file);

        const response = updateUserProfile(formData);
        

        toast.promise(response, {
            loading: 'Uploading...',
            success: async (res) => {
                const newPath = res.data.path;
                if (type === 'profile') {
                    setCurrentUser((prev) => ({ ...prev, profile_picture: newPath }));
                    await update({profile_picture:currentUser.profile_picture});
                } else {
                    setCurrentUser((prev) => ({ ...prev, bg_picture: newPath }));
                    await update({bg_picture:currentUser.bg_picture});
                }
                await update({profile_picture:currentUser.profile_picture});
                return res.data.message;
                },
            error: (err) => err?.response?.data?.error || 'Upload failed',
        });
    }

    return (
        <div className="w-full relative">
            <div className="relative group">
                {
                    currentUser.bg_picture ? (
                        <Image
                            src={currentUser.bg_picture}
                            alt="user background"
                            className="w-full h-[200px] object-cover border border-gray-200 rounded-md shadow-lg"
                            width={200}
                            height={200}
                        />
                    ) : (
                        <div className={`w-full h-[200px] border border-gray-200 rounded-md shadow-lg ${user.defaultColor}`}></div>
                    )
                }

                {
                    isOwner && (
                        <label className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-md">
                            <input type="file" hidden onChange={(e) => handleUpload(e,'background')}/>
                            <span className="text-white font-semibold">Change Background</span>
                        </label>
                    )
                }
            </div>

            <div className='absolute left-20 top-28'>
                <div className="relative group">
                    {
                        currentUser.profile_picture ? (
                            <Image
                                src={currentUser.profile_picture}
                                alt="user profile"
                                className="w-40 h-40 object-cover border-2 border-gray-200 rounded-full shadow-lg"
                                width={200}
                                height={200}
                            />
                        ) : (
                            <div className={`w-40 h-40 flex justify-center items-center text-white text-5xl font-semibold rounded-full border-2 border-gray-200 shadow-lg ${user.defaultColor}`}>
                                {user.username[0].toUpperCase()}
                            </div>
                        )
                    }

                    {
                        isOwner && (
                            <label className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                                <input type="file" hidden onChange={(e) => handleUpload(e,'profile')}/>
                                <span className="text-white font-semibold text-sm">Change Photo</span>
                            </label>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
