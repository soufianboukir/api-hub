'use client'

import { fetchUserApis } from "@/services/apis";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ApiCard } from "./ApiCard";
import { SimplifiedApi } from "@/interfaces/api";
import { PaginationControls } from "../ui/pagination";


const UserApis = ({username,isOwner} : {username: string, isOwner: boolean}) => {
    const [apis,setApis] = useState<SimplifiedApi[]>();
    const [loading,setLoading] = useState<boolean>(false);
    const [page,setPage] = useState<number>(1);
    const [totalPages,setTotalPages] = useState<number>(1);

    const fetchApis = async (currentPage: number) => {
        setLoading(true);
        try {
            const response = await fetchUserApis(username,currentPage);
            
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

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page+1)
            fetchApis(page + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page-1)
            fetchApis(page - 1);
        }
    };

    if (loading) return <p>Loading APIs...</p>;
    return (
        <div>
            <div className='grid lg:grid-cols-3 gap-2 mt-6'>
                {
                    apis && apis.length ? 
                        apis.map((api) => (
                            <ApiCard key={api._id} api={api} isOwner={isOwner}/>
                        ))
                    : "No api's published by this user"
                }
            </div>
            <br />
            {
                apis && apis.length ? (
                    <PaginationControls previous={handlePrevious} next={handleNext}/>
                ) : null
            }
        </div>
    )
}


export default UserApis;