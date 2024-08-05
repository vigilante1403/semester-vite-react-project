import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../../services/apiTours";

export function useTours(){
    const {data:tours,isLoading}=useQuery({
        queryKey:['tours'],
        queryFn: getAllTours
    })
    return {tours,isLoading}
}