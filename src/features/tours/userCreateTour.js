import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewTour } from "../../services/apiTours";
import toast from "react-hot-toast";

export function useCreateTour(){
    const queryClient=useQueryClient();
    const {mutate:createTour,isLoading:isCreating}=useMutation({
        mutationFn:(tourForm)=> addNewTour(tourForm),
        retry:false,
        onError:(err)=>toast.error(err.message),
        onSuccess:()=>{toast.success('New tour created');
            queryClient.invalidateQueries({
                predicate: query =>
                    query.queryKey[0].startsWith("tours")
            })
        }
    })
    return {createTour,isCreating}
}
