import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";


export function useUsers(){
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const searchRoleValue = searchParams.get('role') || 'all';
    // const userName = searchParams.get('user') || 'all';
    const sortBy = searchParams.get('sortBy') || 'name-asc';
    const currentPage = !searchParams.get('page')?1:Number(searchParams.get('page'))
    const {data:users,isLoading}=useQuery({
        // queryKey:['users',searchRoleValue,sortBy,currentPage],
        queryKey:['users',currentPage],
        retry:false,
        queryFn:getAllUsers
    })
    const pageCount = users? Math.ceil(users.length/PAGE_SIZE):1
    if(currentPage<pageCount){
        // queryClient.prefetchQuery({
        //     queryKey:['users',searchRoleValue,sortBy,currentPage+1],
        //     retry:false,
        //     queryFn: getAllUsers
        // })
        queryClient.setQueryData(['users',currentPage+1],users)
    }
    if(currentPage>1){
        // queryClient.prefetchQuery({
        //     queryKey:['users',searchRoleValue,sortBy,currentPage-1],
        //     retry:false,
        //     queryFn: getAllUsers
        // })
        queryClient.setQueryData(['users',currentPage-1],users)
    }
    return {users,isLoading};
   
}