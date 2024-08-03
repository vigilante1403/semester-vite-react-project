import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings, getBookingsByTourId, getBookingsOfUser } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookingsTotal(){
    const {data:bookings,isLoading}=useQuery({
        queryKey:['bookings'],
        queryFn:getAllBookings
    })
    return {bookings,isLoading}
}
export function useBookingsByUser(){
    const [searchParams]=useSearchParams()
    const searchUserIdentity=searchParams.get('userId')||null
    const {data:bookings,isLoading}=useQuery({
        queryKey:[`bookings-user-${searchUserIdentity}`],
        queryFn:getBookingsOfUser
    })
    return {bookings,isLoading}
}
export function useBookingsByTour(){
    const [searchParams]=useSearchParams()
    const searchTourId=searchParams.get('tourId')||null
    const {data:bookings,isLoading}=useQuery({
        queryKey:[`bookings-tour-${searchTourId}`],
        queryFn:getBookingsByTourId
    })
    return {bookings,isLoading}
}