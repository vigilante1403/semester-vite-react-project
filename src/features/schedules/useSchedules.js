import { useQuery } from "@tanstack/react-query";
import { getAllSchedules, getAllSchedulesOfAGuide, getAllSchedulesOfATour, getDetailSchedule } from "../../services/apiTours";
import { useSearchParams } from "react-router-dom";

export function useGetAllSchedules({authorized=true}){
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules'],
        queryFn: getAllSchedules,
        enabled:authorized===true,
        retry:false
    })
    return {schedules,isLoading}
}
export function useGetAllSchedulesOfAGuide({guideId=null}){
   
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules','guide',guideId],
        queryFn:()=> getAllSchedulesOfAGuide({guideId:guideId}),
        enabled:guideId!==null,
        retry:false
    })
    return {schedules,isLoading}
}
export function useGetAllSchedulesOfATour({tourId=null}){
    const {data:schedules,isLoading}=useQuery({
        queryKey:['schedules','tour',tourId],
        queryFn: ()=>getAllSchedulesOfATour({tourId:tourId}),
       
    })
    return {schedules,isLoading}
}
export function useGetDetailSchedule({scheduleId=null}){
    const {data:schedule,isLoading}=useQuery({
        queryKey:['schedule','detail',scheduleId],
        queryFn: ()=>getDetailSchedule({scheduleId:scheduleId}),
        enabled:!!scheduleId
    })
    return {schedule,isLoading}
}