import { SearchIcon } from 'lucide-react'
import React from 'react'

export const SearchInput = () => {
    return (
        <div className='relative'>
            <div className='absolute top-[25%] left-2'>
                <SearchIcon className='w-4 h-4 text-black'/>
            </div>
            <input type="text" 
            className='w-[100%] border outline-none border-gray-300 pl-7 py-1.5 text-sm rounded-sm placeholder:text-black hover:bg-gray-100 duration-200 cursor-pointer'
            placeholder="Search for API's" />
        </div>
    )
}
