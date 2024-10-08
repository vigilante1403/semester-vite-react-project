import { useQuery } from "@tanstack/react-query";
import { getAllStartDates, getAllStartDatesOfATour } from "../../services/apiTours";
import { getAllUpcomingBookingOfSameTour } from "../../services/apiBookings";

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