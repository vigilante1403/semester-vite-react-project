import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { findUserById } from "../../services/apiUsers";

export function useUser(){
    const {id}=useParams()
    const {data:user,isLoading}=useQuery({
        queryKey:['user',id],
        queryFn:()=>findUserById(id),
        enabled:!!id
    })
    if(!id){
        return {user:null,isLoading:false}
    }
    return {user,isLoading}
}