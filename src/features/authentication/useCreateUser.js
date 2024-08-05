import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewUser as createUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser(){
    const queryClient=useQueryClient();
    const {mutate:createUser,isLoading:isCreating}=useMutation({
        mutationFn: createUserApi,
        onError:(err)=>toast.error(err.message),
        onSuccess:()=>{toast.success('User created');
            queryClient.invalidateQueries({
                queryKey:['users']
            })
        }
    })
    return {createUser,isCreating}
}