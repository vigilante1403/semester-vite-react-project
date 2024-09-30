import { useQuery } from "@tanstack/react-query";
import { getAllSchedules, getAllSchedulesOfAGuide, getAllSchedulesOfATour, getDetailSchedule } from "../../services/apiTours";
import { useSearchParams } from "react-router-dom";

export function useGetAllSchedules(){
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules'],
        queryFn: getAllSchedules
    })
    return {schedules,isLoading}
}
export function useGetAllSchedulesOfAGuide({guideId=null}){
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules','guide',guideId],
        queryFn:()=> getAllSchedulesOfAGuide({guideId:guideId}),
        enabled:!!guideId
    })
    return {schedules,isLoading}
}
export function useGetAllSchedulesOfATour({tourId=null}){
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules','tour',tourId],
        queryFn: ()=>getAllSchedulesOfATour({tourId:tourId}),
        enabled:!!tourId
    })
    return {schedules,isLoading}
}
export function useGetDetailSchedule({scheduleId=null}){
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules','detail',scheduleId],
        queryFn: ()=>getDetailSchedule({scheduleId:scheduleId}),
        enabled:!!scheduleId
    })
    return {schedules,isLoading}
}