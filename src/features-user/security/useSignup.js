import { useMutation, useQueryClient } from "@tanstack/react-query";
import {signUp as signUpApi} from '../../services/apiUsers'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useSignup(){
    const navigate=useNavigate()
  
    const {mutate:signUp,isLoading}=useMutation({
        mutationFn:signUpApi,
        onError:()=>toast.error('Cannot signup! Please try again'),
        onSuccess:()=>{
            navigate('/signup/signUpVerificationRequired')
        }
    })
    return {signUp,isLoading}
}