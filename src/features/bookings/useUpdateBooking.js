import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useUpdateBooking(){
    const queryClient = useQueryClient()
    const {mutate:updateBooking,isLoading:isUpdating}=useMutation({
        mutationFn:updateBookingApi,
        onError:(err)=>toast.error(err.message),
        onSuccess:(data)=>{
            toast.success('Update booking successfully')
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
        }
    })
    return {updateBooking,isUpdating}
}