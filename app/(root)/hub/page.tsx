import { Category } from '@/components/Category';
import { fetchCategories } from '@/components/Sidebar'
import { CategoryI } from '@/models/category.model';
import React from 'react'

async function page() {
    const categories:CategoryI[] = await fetchCategories(8);

    return (
        <div className='w-[100%]'>
            <h1 className='text-2xl font-semibold'>Categories</h1>
            <br />
            <div className="flex gap-4 flex-wrap mt-2">                    
                {
                    categories && categories.length ? (
                        categories.map((category) => (
                            <Category key={category._id as string} category={category} />
                        ))
                    ) : "No category available"
                }
            </div>
            <h1 className='font-semibold text-3xl'>MAIN PAGE</h1>
        </div>
    )
}

export default page
