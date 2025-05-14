'use client'

import { ApiCard } from '@/components/client/ApiCard';
import { Loading } from '@/components/Loading';
import { PaginationControls } from '@/components/ui/pagination';
import { handleNext, handlePrevious } from '@/functions';
import { SimplifiedApi } from '@/interfaces/api';
import { getFavoriteApis } from '@/services/apis';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function FavoriteApis({params}:{params:{username: string}}) {

    const { data: session, status } = useSession();
    const [apis,setApis] = useState<SimplifiedApi[]>();
    const [loading,setLoading] = useState<boolean>(false);
    const [page,setPage] = useState<number>(1);
    const [totalPages,setTotalPages] = useState<number>(1);

    if(!(session?.user.username === params.username)){
        redirect('/unauthorized')
    }

    const fetchUserFavoriteApis = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await getFavoriteApis(currentPage);
            console.log(response);
            
            if (response.status === 200) {
                setApis(response.data.favoriteApis);
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
        fetchUserFavoriteApis(page);
    }, []);

    if(status === 'loading' || loading) return <Loading />

    return (
        <div>
            <h1 className='text-xl font-semibold'>Favorite apis</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {
                    apis && apis.length ? (
                        apis.map((api) =>(
                            <ApiCard key={api._id} api={api}
                            isOwner={session.user.id === api.author._id}/>
                        ))
                    ) : "No favorite api's founded"
                }
                {
                    apis && apis.length ? (
                        <PaginationControls
                            previous={() => handlePrevious({ page, setPage, getMore: fetchUserFavoriteApis})}
                            next={() => handleNext({page,totalPages,setPage,getMore:fetchUserFavoriteApis})} />
                    ) : null
                }
            </div>
        </div>
    )
}

export default FavoriteApis
