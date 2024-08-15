import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout(){
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    queryClient.removeQueries()
    navigate('/',{replace:true})

}