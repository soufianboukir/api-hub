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

interface FavoriteApi {
    _id: string,
    api: SimplifiedApi
}

const FavoriteApis = ({params}:{params:{username: string}}) => {

    const { data: session, status } = useSession();
    const [favoriteApis,setFavoriteApis] = useState<FavoriteApi[]>();
    const [loading,setLoading] = useState<boolean>(false);
    const [page,setPage] = useState<number>(1);
    const [totalPages,setTotalPages] = useState<number>(1);

    const fetchUserFavoriteApis = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await getFavoriteApis(currentPage);
            console.log(response);
            
            if (response.status === 200) {
                setFavoriteApis(response.data.favoriteApis);
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

    if(status === 'loading') return <Loading />

    if(status === 'authenticated' && session.user.username !== params.username){
        redirect('/unauthorized')
    }
    
    return (
        <div>
            <h1 className='text-3xl font-semibold'>Favorite apis</h1>
            <br />
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
                {
                    !loading && favoriteApis && favoriteApis.length ? (
                        favoriteApis.map((favoriteApi) =>(
                            <ApiCard isOnFavoritePage={true} key={favoriteApi._id} api={favoriteApi.api}
                            isOwner={session?.user.id === favoriteApi.api.author._id} favorite_id={favoriteApi._id}/>
                        ))
                    ) : "No favorite api's founded"
                }
            </div>
            <br />
            {
                favoriteApis && favoriteApis.length ? (
                    <PaginationControls
                        previous={() => handlePrevious({ page, setPage, getMore: fetchUserFavoriteApis})}
                        next={() => handleNext({page,totalPages,setPage,getMore:fetchUserFavoriteApis})} />
                ) : null
            }
        </div>
    )
}

export default FavoriteApis
