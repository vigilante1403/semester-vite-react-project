import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllSchedules, getAllStartDates, getAllStartDatesOfATour } from "../../services/apiTours";
import { changeBookingPaymentSessionId, getAllUpcomingBookingOfSameTour } from "../../services/apiBookings";
import toast from "react-hot-toast";

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
export function useGetAllUpcomingBookingsOfSameTour({userId,tourId}){
    const {data:bookings,isLoading:isGetting}=useQuery({
        queryKey:['bookings',userId,tourId,'upcoming'],
        queryFn:()=>getAllUpcomingBookingOfSameTour({tourId:tourId,userId:userId}),
        enabled:!!userId&&!!tourId
    })
    return {bookings,isGetting}
}
export const useChangeBookingSessionId = ()=>{
    const {mutate:changeSession,isLoading:isEditting}=useMutation({
        mutationFn:changeBookingPaymentSessionId,
        onError:(err)=>toast.error(err)
    })
    return {changeSession,isEditting}
}
export function useGetAllSchedules(){
    const{data:schedules,isLoading:isLoadingSchedule}=useQuery({
        queryKey:['schedules'],
        queryFn:getAllSchedules
    })
    return {schedules,isLoadingSchedule}
}