'use server'
import { CategoryI } from '@/models/category.model'
import { getCategories } from '@/services/categories'
import { AxiosResponse } from 'axios'
import { AlignJustify, Earth, Folder, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface CategoriesResponse extends AxiosResponse{
    data: {
        categories : CategoryI[]
    }
}

export const fetchCategories = async (limit: number):Promise<CategoryI[]> => {
    try {
        const response:CategoriesResponse = await getCategories({limit:limit});
        
        const categories: CategoryI[] = []; 
        if (response && response.data && response.data.categories) {
            return response.data.categories;
        }
        
        return categories;
    } catch {
        return [];
    }
};


export const Sidebar = async () => {

    const categories = await fetchCategories(8);


    return (
        <div className='bg-gray-50 w-[20%] border-r border-r-gray-200 pt-10 px-6 h-[92vh] mt-[8vh] fixed lg:block hidden'>
            <div className='flex flex-col gap-2'>
                <div className='hover:bg-sky-100 py-2 px-3 rounded-md cursor-pointer duration-200'>
                    <Link href={'/hub'} className='flex flex-row gap-2 items-center font-semibold'>
                        <Earth className='w-5 h-5'/>
                        <span>Discovery</span>
                    </Link>
                </div>

                <div className='hover:bg-sky-100 py-2 px-3 rounded-md cursor-pointer duration-200'>
                    <Link href={'/workspace'} className='flex flex-row gap-2 items-center font-semibold'>
                        <Star className='w-5 h-5'/>
                        <span>Workspace</span>
                    </Link>
                </div>

                <div className='hover:bg-sky-100 py-2 px-3 rounded-md cursor-pointer duration-200'>
                    <Link href={'/collections'} className='flex flex-row gap-2 items-center font-semibold'>
                        <Folder className='w-5 h-5'/>
                        <span>Collections</span>
                    </Link>
                </div>
            </div>
            <br />
            <hr className='border border-gray-200' />
            <div className='mt-2'>
                <h1 className='font-semibold'>Categories</h1>
                <div className='mt-4'>
                    {
                        categories && categories.length ? (
                            categories.map((category) => (
                                <div key={category._id as string} className='hover:bg-sky-100 py-2 px-3 rounded-md cursor-pointer duration-200'>
                                    <Link href={`/search/${category.name}`} className='flex flex-row gap-2 items-center'>
                                        <span>{category.name}</span>
                                    </Link>
                                </div>
                            ))
                        ) : "No category avaliable"
                    }
                    <div className='hover:bg-sky-100 py-2 px-3 rounded-md cursor-pointer duration-200'>
                        <Link href={'/dashboard'} className='flex flex-row gap-2 items-center'>
                            <AlignJustify className='w-5 h-5' strokeWidth={1.5}/>
                            <span>More categories</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
