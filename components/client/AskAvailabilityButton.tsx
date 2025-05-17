'use client'


import { startConversation } from '@/services/conversations'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export const AskAvailabilityButton = ({apiId}: {apiId: string}) => {
    const askPublishedIsApiAvailable = () =>{
        toast.promise(startConversation(apiId),{
            loading: 'Sending...',
            success: (res) => res.data.message,
            error: (err) => err?.response?.data?.message || 'Internal server error'
        })
    }
    return (
        <div>
            <Button onClick={askPublishedIsApiAvailable}>
                Ask publisher if its available
            </Button>
        </div>
    )
}
