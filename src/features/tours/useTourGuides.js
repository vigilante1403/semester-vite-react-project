import { useQuery } from "@tanstack/react-query";

import { getAllGuides } from "../../services/apiUsers";

export function useTourGuides(){
   const {data:guides,isLoading}=useQuery({
    queryKey:['guides'],
    queryFn: getAllGuides
   })
    return {guides,isLoading}
}