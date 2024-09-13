import { useMutation, useQueryClient } from "@tanstack/react-query";
import {forgotPass as forgotPassApi, confirmForgotPass as confirmForgotPassApi } from '../../services/apiUsers'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useForgotPassword(){
    const navigate=useNavigate()
  
    const {mutate:forgotPass,isLoading}=useMutation({
        mutationFn:forgotPassApi,
        onError:()=>toast.error('Invalid email! Please try again'),
        onSuccess:()=>{
            toast.success('Send email success. Please check your email!');
            navigate('/')
        }
    })
    return {forgotPass,isLoading}
}

export function useConfirmForgotPassword(){
    const navigate=useNavigate()
  
    const {mutate:confirmForgotPass,isLoadingConfirm}=useMutation({
        mutationFn:confirmForgotPassApi,
        onError:()=>{},
        onSuccess:()=>{
            navigate('/reset-password/success')
        }
    })
    return {confirmForgotPass,isLoadingConfirm}
}