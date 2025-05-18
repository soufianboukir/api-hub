
import appLogo from '@/public/apihub-Logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './SearchInput'
import { Heart } from 'lucide-react'
import { DropdownMenuDemo } from './DropdownMenu'
import { Session } from 'next-auth'
import { auth } from '@/auth'
import { ModeToggle } from './ModeToggle'
import Notifications from './Notifications'

export const Header = async () => {
    const session:Session | null = await auth();
    
    return (
        <header className='flex bg-gray-50 dark:bg-[#1a1a1a] justify-between items-center px-2 lg:px-10 py-1 h-[8vh] border-b border-b-gray-300 fixed z-20 w-[100%]'>
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
                <div className="hover:bg-gray-100 dark:hover:bg-gray-800 duration-200 p-2 rounded-md cursor-pointer">
                    <Link href={`/user/${session?.user.username}/publishApi`}>
                        <span className='font-semibold text-sm'>Publish new api</span>
                    </Link>
                </div>

                <div className="hover:bg-gray-100 dark:hover:bg-gray-800 duration-200 p-2 rounded-md cursor-pointer">
                    <Link href={'/hub'}>
                        <span className='font-semibold text-sm'>Api marketplace</span>
                    </Link> 
                </div>

                <div className='p-2 rounded-md'>
                    <ModeToggle />
                </div>
                
                <div className="hover:bg-gray-100 dark:hover:bg-gray-800 duration-200 p-2 rounded-md cursor-pointer">
                    <Notifications />
                </div>

                <div className="duration-200 p-2 rounded-md cursor-pointer">
                    <Link href={`/user/${session?.user.username}/favorites`}>
                        <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                </div>

                <div className='p-2'>
                    <DropdownMenuDemo session={session} />
                </div>
            </div>
        </header>
    )
}
