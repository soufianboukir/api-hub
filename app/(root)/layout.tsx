import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'

function layout({children}:Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <Header />
            <div className='flex'>
                <div className='w-[20%]'>
                    <Sidebar />
                </div>
                <div className='mt-[12vh]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout
