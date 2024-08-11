import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTour as deleteTourApi } from "../../services/apiTours";
import toast from "react-hot-toast";

export function useDeleteTour(){
    const queryClient=useQueryClient();
    const {mutate:deleteTour,isLoading:isDeleting}=useMutation({
        mutationFn:(id)=> deleteTourApi(id),
        onError:(err)=>toast.error(err.message),
        onSuccess:(id)=>{toast.success('Tour deleted');
            queryClient.invalidateQueries({
                predicate:query =>
                    query.queryKey[0].startsWith("tours")
            })
           
        }
    })
    return {deleteTour,isDeleting}
}