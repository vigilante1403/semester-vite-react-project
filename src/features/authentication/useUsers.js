import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";


export function useUsers(){
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const userName = searchParams.get('user') || 'all';
    const searchRoleValue = searchParams.get('role') || 'all';
    // const userName = searchParams.get('user') || 'all';
    const sortBy = searchParams.get('sortBy') || 'name-asc';
    const currentPage = !searchParams.get('page')?1:Number(searchParams.get('page'))
    const {data:users,isLoading,refetch}=useQuery({
        queryKey:['users',searchRoleValue,userName,sortBy,currentPage],
        retry:false,
        queryFn:getAllUsers,
        staleTime:0,
        cacheTime: 0,  
        refetchOnMount:true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })
    const pageCount = users? Math.ceil(users.length/PAGE_SIZE):1
    if(currentPage<pageCount){
        queryClient.prefetchQuery({
            queryKey:['users',searchRoleValue,userName,sortBy,currentPage+1],
            retry:false,
            queryFn: getAllUsers,
            staleTime:0,
            cacheTime: 0,  
            refetchOnMount:true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        })
    }
    if(currentPage>1){
        queryClient.prefetchQuery({
            queryKey:['users',searchRoleValue,userName,sortBy,currentPage-1],
            retry:false,
            queryFn: getAllUsers,
            staleTime:0,
            cacheTime: 0,  
            refetchOnMount:true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        })
    }
    return {users,isLoading,refetch};
   
}