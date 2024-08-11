import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking(){
    const queryClient = useQueryClient();
    const {mutate:createBooking,isLoading:isCreating}=useMutation({
        mutationFn:(bookingForm) => addBooking(bookingForm),
        retry:false,
        onError:(err)=>toast.error(err),
        onSuccess:()=>{
            toast.success('Create booking successfully');
            queryClient.invalidateQueries({
                predicate: query => 
                query.queryKey[0].startsWith('bookings')
            })
        }
    })
    return {createBooking,isCreating}
}