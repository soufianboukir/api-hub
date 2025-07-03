'use client'

import React, { useEffect, useState } from 'react'
import { PaginationControls } from '../ui/pagination';
import { SimplifiedApi } from '@/interfaces/api';
import { toast } from 'sonner';
import { ApiCard } from './ApiCard';
import { handleNext, handlePrevious } from '@/functions';
import { filterApisByCategory } from '@/services/search';
import { CategoryI } from '@/models/category.model';
import { Category } from '../Category';

export const ApisByCategory = ({ categoryName }: { categoryName: string }) => {
    const [apis, setApis] = useState<SimplifiedApi[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [category, setCategory] = useState<CategoryI | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await filterApisByCategory(page, categoryName);
                if (response.status === 200) {
                    setApis(response.data.apis);
                    setTotalPages(response.data.totalPages);
                    setCategory(response.data.category);
                } else {
                    toast.error("Operation failed", {
                        description: response.data.message,
                    });
                }
            } catch {
                toast.error("Operation failed", {
                    description: "Internal server error",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, categoryName]);

    const getMore = async (newPage: number) => {
        setLoading(true);
        try {
            const response = await filterApisByCategory(newPage, categoryName);
            if (response.status === 200) {
                setApis(response.data.apis);
                setTotalPages(response.data.totalPages);
                setCategory(response.data.category);
            } else {
                toast.error("Operation failed", {
                    description: response.data.message,
                });
            }
        } catch {
            toast.error("Operation failed", {
                description: "Internal server error",
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading APIs...</p>;

    return (
        <div>
            {
                category && (
                    <div className='grid grid-cols-4'>
                        <Category category={category} />
                    </div>
                )
            }
            <div className='grid lg:grid-cols-3 gap-2 mt-6'>
                {
                    apis && apis.length ?
                        apis.map((api) => (
                            <ApiCard key={api._id} api={api} isOwner={false} />
                        ))
                        : "No available Apis"
                }
            </div>
            <br />
            {
                apis && apis.length ? (
                    <PaginationControls
                        previous={() => handlePrevious({ page, setPage, getMore })}
                        next={() => handleNext({ page, totalPages, setPage, getMore })}
                    />
                ) : null
            }
        </div>
    );
};
