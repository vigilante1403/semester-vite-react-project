import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTours } from "../../services/apiTours";
import { useSearchParams } from "react-router-dom";

export function useTours(){
    
    const queryClient=useQueryClient()
    
    const {data:tours,isLoading}=useQuery({
        queryKey:['tours'],
        retry:false,
        queryFn: getAllTours
    })
  
    return {tours,isLoading}
}