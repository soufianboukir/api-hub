'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import tux from '@/public/tux.jpg'
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

export function DropdownMenuDemo({session}:{session:Session | null}) {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {
          session?.user?.profile_picture ? (
            <Image
              src={tux} 
              width={30}
              height={30}
              alt="Application logo"
              priority
              className='cursor-pointer object-cover rounded-full aspect-square' 
            /> 
          ): (
            <div className={`w-8 h-8 text-white flex justify-center items-center rounded-full ${session?.user?.defaultColor}`}>
              {session?.user?.name ? session.user.name[0] : 'U'}
            </div>
          )
        }
          
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-10 border-1 border-gray-200 shadow-xl">
        <DropdownMenuLabel>
          {
            session?.user?.username
          }
          <p className="text-gray-500">
            {
              session?.user?.email
            }
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            User profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Favorite APIs
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
