import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addStartDatesOfTour, cancelAStartDate, editStartDatesOfTour } from "../../services/apiTours"
import toast from "react-hot-toast";

export const useAddStartDate = ()=>{
    const queryClient=useQueryClient()
    const {mutate:addDate,isLoading:isAdding}=useMutation({
        mutationFn:addStartDatesOfTour,
        onError:(err)=>toast.error(err.message),
        onSuccess:()=>{toast.success('Tour add new start date');
            queryClient.invalidateQueries({
                queryKey:['tours']
            })
        }
        
    })
    return {addDate,isAdding}
}
export const useEditStartDate = ()=>{
    const queryClient=useQueryClient()
    const {mutate:editDate,isLoading:isEditting}=useMutation({
        mutationFn:editStartDatesOfTour,
        onError:(err)=>toast.error(err.message),
        onSuccess:()=>{toast.success('Tour edited start date');
            queryClient.invalidateQueries({
                queryKey:['tours']
            })
        }
        
    })
    return {editDate,isEditting}
}
export const useDeleteStartDate = ()=>{
    const queryClient=useQueryClient()
    const {mutate:deleteDate,isLoading:isDeleting}=useMutation({
        mutationFn:cancelAStartDate,
        onError:(err)=>toast.error(err.message),
        onSuccess:()=>{toast.success('Tour deleted start date');
            queryClient.invalidateQueries({
                queryKey:['tours']
            })
        }
        
    })
    return {deleteDate,isDeleting}
}
