'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'

const PublishApi = () => {
    return (
        <div>
            <div>
                <h1 className='text-2xl font-semibold'>Publish new Api</h1>
            </div>
            <div className='mt-4 w-[100%] lg:w-[50%] flex flex-col gap-4'>
                <div>
                    <Label className='text-lg'>
                        Title
                    </Label>
                    <Input placeholder='Ex: weather app'/>
                </div>

                <div>
                    <Label className='text-lg'>
                        Description
                    </Label>
                    <Textarea placeholder='Ex: weather app' rows={5}/>
                </div>

                <div>
                    <Label className='text-lg'>
                        Category
                    </Label>
                    <Textarea placeholder='Ex: weather app' rows={5}/>
                </div>
            </div>
        </div>
    )
}

export default PublishApi;