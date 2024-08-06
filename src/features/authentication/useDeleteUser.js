import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useDeleteUser(){
    const queryClient=useQueryClient();
    const {mutate:deleteUser,isLoading:isDeleting}=useMutation({
        mutationFn:(id) => deleteUserApi(id),
        onError:(err)=>toast.error(err.message),
        onSuccess:(id)=>{toast.success('User deleted');
            queryClient.invalidateQueries({
                queryKey:['users']
            })
            queryClient.removeQueries({
                queryKey:['user',id]
            })
        }
    })
    return {deleteUser,isDeleting}
}