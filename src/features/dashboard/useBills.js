import { useQuery } from "@tanstack/react-query";
import { getAllBills } from "../../services/apiBill"

export function useBills(){
    const {data:bills,isLoading}=useQuery({
        queryKey:['bills'],
        retry:false,
        queryFn:getAllBills
    })
    return {bills,isLoading};
}
