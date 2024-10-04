import { useQuery } from "@tanstack/react-query";
import { getAllStartDates, getAllStartDatesOfATour } from "../../services/apiTours";

export function useGetAllStartDatesOfTour({tourId}){
    const {data:startDates,isLoading}=useQuery({
        queryKey:['startDates',tourId],
        queryFn:()=>getAllStartDatesOfATour({tourId:tourId}),
        enabled:!!tourId
       
    })
    return {startDates,isLoading}
}
export function useGetAllStartDates(){
    const{data:startDates,isLoading}=useQuery({
        queryKey:['startDates'],
        queryFn:getAllStartDates
    })
    return {startDates,isLoading}
}