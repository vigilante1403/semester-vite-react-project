import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useUpdateBooking(){
    const queryClient = useQueryClient()
    const navigate=useNavigate()
    const {mutate:updateBooking,isLoading:isUpdating}=useMutation({
        mutationFn:updateBookingApi,
        onError:(err)=>toast.error(err.message),
        onSuccess:(data)=>{
            toast.success('Update booking successfully')
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
            navigate("/admin/bookings")
        }
    })
    return {updateBooking,isUpdating}
}