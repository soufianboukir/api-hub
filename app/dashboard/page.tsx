import { auth } from '@/auth'
import React from 'react'

function page() {
    const session = auth();
    
    return (
        <div>
            <h1 className='text-3xl font-semibold mt-20 ml-20'>THIS IS THE HOME PAGE</h1>
        </div>
    )
}

export default page
