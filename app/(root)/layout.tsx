import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'

function layout({children}:Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <Header />
            <div className='flex'>
                <div>
                    <Sidebar />
                </div>
                <div className='mt-[12vh] w-[100%] lg:ml-[21%] lg:px-0 px-5'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout
