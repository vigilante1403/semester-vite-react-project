import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTour as deleteTourApi } from "../../services/apiTours";
import toast from "react-hot-toast";

export function useDeleteTour(){
    const queryClient=useQueryClient();
    const {mutate:deleteTour,isLoading:isDeleting}=useMutation({
        mutationFn: deleteTourApi,
        onError:(err)=>toast.error(err.message),
        onSuccess:(id)=>{toast.success('Tour deleted');
            queryClient.invalidateQueries({
                queryKey:['tours']
            })
            queryClient.removeQueries({
                queryKey:['tour',id]
            })
        }
    })
    return {deleteTour,isDeleting}
}