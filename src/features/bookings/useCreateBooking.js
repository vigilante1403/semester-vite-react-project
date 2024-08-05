import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking(){
    const queryClient = useQueryClient();
    const {mutate:createBooking,isLoading:isCreating}=useMutation({
        mutationFn:addBooking,
        onError:(err)=>toast.error(err),
        onSuccess:()=>{
            toast.success('Create booking successfully');
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
        }
    })
    return {createBooking,isCreating}
}