import { useMutation, useQueryClient } from "@tanstack/react-query";
import {login as loginApi} from '../../services/apiUsers'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useLogin(){
    const navigate=useNavigate()
    const queryClient = useQueryClient()
    const {mutate:login,isLoading}=useMutation({
        mutationFn:loginApi,
        onError:()=>toast.error('Provided email or password are incorrect'),
        onSuccess:(data)=>{
            queryClient.setQueryData(['user-isSignedIn'],data.email)
            
            // navigate('/',{replace:true})
            window.location.reload();
        }
    })
    return {login,isLoading}
}