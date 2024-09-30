import { useQuery } from "@tanstack/react-query";
import { getAllSchedules, getAllSchedulesOfAGuide, getAllSchedulesOfATour } from "../../services/apiTours";
import { useSearchParams } from "react-router-dom";

export function useGetAllSchedules(){
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules'],
        queryFn: getAllSchedules
    })
    return {schedules,isLoading}
}
export function useGetAllSchedulesOfAGuide(){
    const [searchParams]=useSearchParams()
    const guideId = searchParams.get('guideId')||null;
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules','guide',guideId],
        queryFn:()=> getAllSchedulesOfAGuide({guideId:guideId}),
        enabled:!!guideId
    })
    return {schedules,isLoading}
}
export function useGetAllSchedulesOfATour(){
    const [searchParams]=useSearchParams()
    const tourId= searchParams.get('tourId')||null;
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules','tour',tourId],
        queryFn: ()=>getAllSchedulesOfATour({tourId:tourId}),
        enabled:!!tourId
    })
    return {schedules,isLoading}
}