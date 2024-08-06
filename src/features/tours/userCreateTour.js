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
                queryKey:['tours']
            })
        }
    })
    return {createTour,isCreating}
}
