import { Category } from '@/components/Category';
import { FeedApis } from '@/components/client/FeedApis';
import { fetchCategories } from '@/components/Sidebar'
import { CategoryI } from '@/models/category.model';
import React from 'react'

async function page() {
    const categories:CategoryI[] = await fetchCategories(8);

    return (
        <div className='w-[100%]'>
            <h1 className='text-2xl font-semibold'>Categories</h1>
            <br />
            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4 mt-2">                    
                {
                    categories && categories.length ? (
                        categories.map((category) => (
                            <Category key={category._id as string} category={category} />
                        ))
                    ) : "No category available"
                }
            </div>
            <br />
            <br />
            <h1 className='font-semibold text-3xl'>Available apis</h1>
            <FeedApis />
            <br />
        </div>
    )
}

export default page
