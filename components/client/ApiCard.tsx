import Image from 'next/image'
import React from 'react'
import testImage from '../../assets/apiImageTEST.png'
import { Bolt, Heart } from 'lucide-react'

export const ApiCard = () => {
    return (
        <div className='px-5 py-3 shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 duration-100'>
            <div className='flex items-center justify-between'>
                <span className='bg-blue-100 px-3 py-1 rounded-md'>Cybersecurity</span>
                <div className='flex gap-2'>
                    <Bolt className='w-5 h-5 cursor-pointer'/>
                    <Heart className='w-5 h-5 cursor-pointer'/>
                </div>
            </div>
            <div className='flex gap-2 mt-2 items-start'>
                <div className='w-[50%]'>
                    <Image src={testImage}
                    alt='Api image'
                    width={60}
                    height={60}
                    className='rounded-full object-cover'/>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold'>TEST</h1>
                    <span className='text-gray-600'>this is  the description
                    this is  the descriptionthis is  the descriptionthis is  the descriptionthis is  the descriptionthis is  the description
                    this is  the descriptionthis is  the descriptionthis is  the descriptionthis is  the descriptionthis is  the description
                    </span>
                </div>
            </div>
            <br />
            <div className='flex justify-between text-gray-500'>
                <span>By sof1Boukir</span>
                <span>Updated 4 days ago</span>
            </div>
        </div>
    )
}
