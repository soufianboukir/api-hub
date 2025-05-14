import { auth } from '@/auth'
import ApiForm from '@/components/client/ApiForm'
import { fetchApi } from '@/services/apis'
import { redirect } from 'next/navigation'
import React from 'react'

interface EditApiProps {
    params : {
        username: string,
        apiId: string
    }
}

async function page({params}: EditApiProps) {
    const session = await auth();

    const apiData = await fetchApi(params.apiId)    

    if (apiData && apiData.author._id !== session?.user.id) {
        return redirect('/unauthorized')
    }
    return (
        <div>
            <h1 className='text-3xl font-semibold'>
                <ApiForm type='edit' apiForm={apiData} apiId={params.apiId} username={params.username}/>
            </h1>
        </div>
    )
}

export default page
