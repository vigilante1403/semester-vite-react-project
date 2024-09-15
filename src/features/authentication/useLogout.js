import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
import {logout as logoutApi} from "../../services/apiUsers"
export function useLogout(){
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    
    const{mutate:logout}=useMutation({
        mutationFn: logoutApi,
        onSuccess:()=>{queryClient.removeQueries();navigate('/',{replace:true});}
    });
    return {logout}

}
