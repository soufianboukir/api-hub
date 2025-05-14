'use client'

import ApiForm from '@/components/client/ApiForm'
import React from 'react'

const PublishApi = ({params}: {params: {username: string}}) => {
    return (
        <div>
            <ApiForm type='publish' username={params.username}/>
        </div>
    )
}
export default PublishApi;