import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookingsOfUser } from "../../services/apiBookings";
import { getAllSchedulesFromASingleBookingId } from "../../services/apiTours";
export const useBookingsOfUser = (userId)=>{
    // console.log(typeof(userId))
    const searchUserIdentity=userId
    // console.log(typeof(searchUserIdentity))
    const {data:bookings,isLoading}=useQuery({
        queryKey:[`bookings-user-${searchUserIdentity}`],
        queryFn:()=>getBookingsOfUser({userId:searchUserIdentity}),
        enabled:!!userId&&userId!==undefined
    })
    return {bookings,isLoading1:isLoading}
}
export const useGetAllSchedulesFromASingleBookingId =({bookingId})=>{
    const {data:schedules,isLoading:isLoading1}=useQuery({
        queryKey:['schedules',bookingId],
        queryFn:()=>getAllSchedulesFromASingleBookingId({bookingId:bookingId}),
        enabled:!!bookingId
    })
    return {schedules,isLoading1}
}