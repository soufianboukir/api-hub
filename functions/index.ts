import { markNotifcationsRead } from "@/services/notifications";
import { toast } from "sonner";

interface PaginationFunctionsParametres{
    page: number,
    totalPages?: number,
    setPage: (page: number) => void,
    getMore: (page: number) => void
}

export const handleNext = ({page,totalPages,setPage,getMore}:PaginationFunctionsParametres) =>{
    if (page < totalPages!) {
        setPage(page+1)
        getMore(page + 1);
    }
}

export const handlePrevious = ({page,setPage,getMore}:PaginationFunctionsParametres) =>{
    if (page > 1) {
        setPage(page-1)
        getMore(page - 1);
    }
}   

export const markNotReaded = () =>{
    toast.promise(markNotifcationsRead(),{
        loading: 'Loading...',
        success: (res) => res.data.message,
        error: (err) => err.response.data.message
    })
} 