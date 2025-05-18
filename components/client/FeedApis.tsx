'use client'

import React, { useEffect, useState } from 'react'
import { PaginationControls } from '../ui/pagination';
import { SimplifiedApi } from '@/interfaces/api';
import { getFeed } from '@/services/feed';
import { toast } from 'sonner';
import { ApiCard } from './ApiCard';
import { handleNext, handlePrevious } from '@/functions';

export const FeedApis = () => {
    const [apis,setApis] = useState<SimplifiedApi[]>();
    const [loading,setLoading] = useState<boolean>(false);
    const [page,setPage] = useState<number>(1);
    const [totalPages,setTotalPages] = useState<number>(1);

    const fetchApis = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await getFeed(currentPage);
            
            if (response.status === 200) {
                setApis(response.data.apis);
                setTotalPages(response.data.totalPages);
            } else {
                toast.error('Operation failed',{
                    description: response.data.message
                })
            }
        } catch {
            toast.error('Operation failed',{
                description: 'Internal server error'
            })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApis(page);
    }, []);

    if (loading) return <p>Loading APIs...</p>;
    return (
        <div>
            <div className='grid lg:grid-cols-3 gap-2 mt-6'>
                {
                    apis && apis.length ? 
                        apis.map((api) => (
                            <ApiCard key={api._id} api={api} isOwner={false}/>
                        ))
                    : "No available Apis"
                }
            </div>
            <br />
            {
                apis && apis.length ? (
                    <PaginationControls
                        previous={() => handlePrevious({ page, setPage, getMore: fetchApis})}
                        next={() => handleNext({page,totalPages,setPage,getMore:fetchApis})} />
                ) : null
            }
        </div>
    )
}
