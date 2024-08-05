import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useDeleteBooking(){
    const queryClient = useQueryClient()
    const {mutate:deleteBooking,isLoading:isDeleting}=useMutation({
        mutationFn:deleteBookingApi,
        onError:(err)=>toast.error(err.message),
        onSuccess:(id)=>{
            toast.success('Booking deleted');
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
            queryClient.removeQueries({
                queryKey:[`booking-id-${id}`]
            })

        }
    })
    return {deleteBooking,isDeleting}
}