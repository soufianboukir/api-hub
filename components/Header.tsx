
import appLogo from '@/public/apihub-Logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './SearchInput'
import { Bell, Heart, Mail } from 'lucide-react'
import { DropdownMenuDemo } from './DropdownMenu'
import { Session } from 'next-auth'
import { auth } from '@/auth'

export const Header = async () => {
    const session:Session | null = await auth();
    
    return (
        <header className='flex justify-between items-center px-2 lg:px-10 py-1 h-[8vh] border-b border-b-gray-300 fixed z-20 bg-white w-[100%]'>
            <div>
                <Link href={'/'}>
                    <Image 
                        src={appLogo} 
                        width={150}
                        height={80}
                        alt="Application logo"
                        priority
                        className='cursor-pointer'
                    />
                </Link>
            </div>
            <div className='w-[20%] lg:block hidden'>
                <SearchInput />
            </div>
            <div className='flex gap-1 items-center'>
                <div className='hover:bg-gray-100 duration-200 p-2 rounded-md cursor-pointer'>
                    <Link href={'/dashboard'}>
                        <span className='font-semibold text-sm'>Api marketplace</span>
                    </Link> 
                </div>
                <div className='hover:bg-gray-100 duration-200 p-2 rounded-md cursor-pointer'>
                    <Bell className='w-5 h-5'/> 
                </div>

                <div className='hover:bg-gray-100 duration-200 p-2 rounded-md cursor-pointer'>
                    <Heart className='w-5 h-5'/>
                </div>
                
                <div className='hover:bg-gray-100 duration-200 p-2 rounded-md cursor-pointer'>
                    <Mail className='w-5 h-5 cursor-pointer'/>
                </div>

                <div className='p-2'>
                    <DropdownMenuDemo session={session} />
                </div>
            </div>
        </header>
    )
}
