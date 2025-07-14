'use server'
import { CategoryI } from '@/models/category.model'
import { getCategories } from '@/services/categories'
import { AxiosResponse } from 'axios'
import { Earth } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { MessagesIcon } from './client/MessagesIcon'

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
        <div className="bg-gray-50 dark:bg-[#1a1a1a] w-[20%] border-r border-gray-200 dark:border-gray-700 pt-10 px-6 h-[92vh] mt-[8vh] fixed lg:block hidden">
            <div className="flex flex-col gap-2">
                <div className="hover:bg-sky-100 dark:hover:bg-sky-900 py-2 px-3 rounded-md cursor-pointer duration-200">
                    <Link href="/hub" className="flex flex-row gap-2 items-center font-semibold text-gray-800 dark:text-gray-200">
                        <Earth className="w-5 h-5" />
                        <span>Discovery</span>
                    </Link>
                </div>

                <div className="hover:bg-sky-100 dark:hover:bg-sky-900 py-2 px-3 rounded-md cursor-pointer duration-200">
                    <MessagesIcon />
                </div>
            </div>

            <br />
            <hr className="border border-gray-200 dark:border-gray-700" />

            <div className="mt-2">
                <h1 className="font-semibold text-gray-800 dark:text-gray-200">Categories</h1>
                <div className="mt-4">
                {categories && categories.length ? (
                    categories.map((category) => (
                    <div key={category._id as string} className="hover:bg-sky-100 dark:hover:bg-sky-900 py-2 px-3 rounded-md cursor-pointer duration-200">
                        <Link href={`/search/category/${category.name}`} className="flex flex-row gap-2 items-center text-gray-800 dark:text-gray-200">
                            <span>{category.name}</span>
                        </Link>
                    </div>
                    ))
                ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">No category available</span>
                )}
                </div>
            </div>
        </div>
    )
}
