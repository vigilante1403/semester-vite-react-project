import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTour as updateTourApi } from "../../services/apiTours";
import toast from "react-hot-toast";

export function useUpdateTour(){
    const queryClient=useQueryClient();
    const {mutate:updateTour,isLoading:isUpdating}=useMutation({
        mutationFn: updateTourApi,
        onError:(err)=>toast.error(err.message),
        onSuccess:()=>{toast.success('Tour edited');
            queryClient.invalidateQueries({
                queryKey:['tours']
            })
        }
    })
    return {updateTour,isUpdating}
}