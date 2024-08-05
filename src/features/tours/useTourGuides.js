import { useQuery } from "@tanstack/react-query";
import { addNewTour } from "../../services/apiTours";
import toast from "react-hot-toast";
import { getAllGuides } from "../../services/apiUsers";

export function useTourGuides(){
   const {data:guides,isLoading}=useQuery({
    queryKey:['guides'],
    queryFn: getAllGuides
   })
    return {guides,isLoading}
}