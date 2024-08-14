import { useQuery } from "@tanstack/react-query";
import {  getTourByIdOrSlug } from "../../services/apiTours";


export function useTour(id){

   const {data:tour,isLoading}=useQuery({
    queryKey:['tour',id],
    queryFn:()=>getTourByIdOrSlug({id:id})
   })
    return {tour,isLoading}
}