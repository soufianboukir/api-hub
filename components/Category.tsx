import { CategoryI } from '@/models/category.model'
import Link from 'next/link'
import React from 'react'

export const Category = ({category}:{category:CategoryI}) => {
    return (
        <div className='border light:border-gray-200 rounded-md px-4 py-2 dark:hover:bg-gray-800 hover:bg-gray-100 duration-200'>
            <span className='text-4xl'>{category?.emoji}</span>
            <h1 className='text-xl font-semibold mt-2'>{category.name}</h1>
            <p className='text-lg text-gray-600 dark:text-gray-200'>{
                category.description.length > 60 ? 
                    category?.description?.substring(0,60) + "..."
                  : category.description
            }</p>
            <br />
            <Link href={`/search/${category.name}`} className='text-blue-600 hover:underline duration-100'>
                Browse category
            </Link>
        </div>
    )
}
