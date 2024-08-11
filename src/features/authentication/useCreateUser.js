import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewUser } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser(){
    const queryClient=useQueryClient();
    const {mutate:createUser,isLoading:isCreating}=useMutation({
        mutationFn:(userForm) => addNewUser(userForm),
        retry:false,
        onError:(err)=>toast.error(err.message),
        onSuccess:()=>{toast.success('User created');
            queryClient.invalidateQueries({
                predicate: query => 
                query.queryKey[0].startsWith('users')
                
            })
        }
    })
    return {createUser,isCreating}
}