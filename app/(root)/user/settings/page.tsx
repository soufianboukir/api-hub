'use client'

import { EditProfile, ProfileInfo, } from "@/components/client/EditProfile";
import { UploadProfileImages } from "@/components/client/UploadProfileImages";
import { Loading } from "@/components/Loading";
import { defaultBio } from "@/constants";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

const Settings = () => {
    const { data: session, status} = useSession();

    const [profileInfo,setProfileInfo] = useState<ProfileInfo | null>(null);    

    useEffect(() => {
        if (session?.user) {
            setProfileInfo({
                name: session.user.name || '',
                username: session.user.username || '',
                email: session.user.email || '',
                bio: session.user.bio || '',
                password: '',
                newPassword: '',
                retypePassword: '',
            });
        }
      }, [session]);

    if(status === 'loading'){
        return <Loading />
    }
    return (
        <div>
            <div>
                <h1 className="text-xl font-semibold">{profileInfo?.username} settings</h1>
                <br />
                {
                    session?.user && (
                        <UploadProfileImages user={session?.user} isOwner={true} />
                    )
                }
                <br /><br /><br /><br />
                {
                    profileInfo && (
                        <div className="p-6 bg-gray-50 rounded-xl shadow-md">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                                <div className="bg-white p-5 rounded-xl shadow-sm">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Name</h2>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 text-base">{profileInfo.name}</span>
                                    </div>
                                </div>
        
                                <div className="bg-white p-5 rounded-xl shadow-sm">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Username</h2>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 text-base">{profileInfo.username}</span>
                                    </div>
                                </div>
        
                                <div className="bg-white p-5 rounded-xl shadow-sm">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Email</h2>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 text-base">{profileInfo.email}</span>
                                    </div>
                                </div>
        
                                <div className="bg-white p-5 rounded-xl shadow-sm">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Password</h2>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 text-base">********</span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="bg-white p-5 rounded-xl shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 text-base">
                                        {
                                            profileInfo.bio ?
                                                profileInfo.bio
                                                : defaultBio
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <EditProfile profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Settings