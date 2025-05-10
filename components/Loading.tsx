import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
export const Loading = () => {
    return (
        <div className='flex min-h-screen mt-[-80px] justify-center items-center'>
            <CircularProgress className='text-blue-600' size={50}/>
        </div>
    )
}
