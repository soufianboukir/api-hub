import { CategoryI } from '@/models/category.model'
import Link from 'next/link'
import React from 'react'

export const Category = ({category}:{category:CategoryI}) => {
    return (
        <div className='border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-100 md:w-[48%] w-[100%] lg:w-[23%] duration-200'>
            <span className='text-4xl'>{category?.emoji}</span>
            <h1 className='text-xl font-semibold mt-2'>{category.name}</h1>
            <p className='text-lg text-gray-600'>{
                category.description.length > 50 ? 
                    category.description.substring(0,50) + "..."
                  : category.description
            }</p>
            <br />
            <Link href={`/search/${category.name}`} className='text-blue-600 hover:underline duration-100'>
                Browse category
            </Link>
        </div>
    )
}
