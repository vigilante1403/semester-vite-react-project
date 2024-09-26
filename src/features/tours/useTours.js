import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTours } from "../../services/apiTours";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useTours(){
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams();
    const searchDiscountValue = searchParams.get('discount') || 'all';
    const sortBy = searchParams.get('sortBy') || 'name-asc';
    const tourName = searchParams.get('tour') || 'all';
    const currentPage = !searchParams.get('page')?1:Number(searchParams.get('page'))
    const {data:tours,isLoading}=useQuery({
        queryKey:['tours',currentPage],
        retry:false,
        queryFn: getAllTours,
        staleTime:0,
        cacheTime: 0,  
        refetchOnMount:true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })
    const pageCount = tours? Math.ceil(tours.length/PAGE_SIZE):1
    if(currentPage<pageCount){
        queryClient.prefetchQuery({
            queryKey:['tours',currentPage+1],
            retry:false,
            queryFn: getAllTours,
            staleTime:0,
            cacheTime: 0,  
            refetchOnMount:true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        })
    }
    if(currentPage>1){
        queryClient.prefetchQuery({
            queryKey:['tours',currentPage-1],
            retry:false,
            queryFn: getAllTours,
            staleTime:0,
            cacheTime: 0,  
            refetchOnMount:true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        })
    }
    return {tours,isLoading}
}