import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllReviewsOfSpecificUser } from "../../services/apiReviews";
export const useReviewsOfUser = (userId)=>{
    // console.log(typeof(userId))
    const searchUserIdentity=userId
    // console.log(typeof(searchUserIdentity))
    const {data:reviews,isLoading}=useQuery({
        queryKey:[`reviews-user-${searchUserIdentity}`],
        queryFn:()=>getAllReviewsOfSpecificUser({userId:searchUserIdentity}),
        enabled:!!userId&&userId!==undefined
    })
    return {reviews,isLoading1:isLoading}
}