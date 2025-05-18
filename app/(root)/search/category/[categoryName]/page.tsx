import { ApisByCategory } from '@/components/client/ApisByCategory'
import React from 'react'

function page({params}: {params: {categoryName: string}}) {

    return (
        <div>
            <h1 className='text-3xl font-semibold'>Results for &quot;{decodeURIComponent(params.categoryName)}&quot;</h1>
            <br />
            <ApisByCategory categoryName={params.categoryName}/>
        </div>
    )
}

export default page
