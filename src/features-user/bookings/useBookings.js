import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookingsOfUser } from "../../services/apiBookings";
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