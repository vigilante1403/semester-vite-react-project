import { useMutation } from "@tanstack/react-query"
import { changePassword } from "../../services/apiUsers"
import toast from "react-hot-toast"

export function useChangePassword(){
   
  
    const {mutate:changePass,isChanging}=useMutation({
        mutationFn:changePassword,
        onError:()=>{},
        onSuccess:()=>{
           toast('Change password success');
        }
    })
    return {changePass,isChanging}
}