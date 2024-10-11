import { QueryCache, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteReviewApi,
  getAllReviewsOfSpecificUser,
  updateAReview,
  writeNewReview,
} from '../../services/apiReviews';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import { ReviewContext } from './Reviews';
export const useReviewsOfUser = (userId) => {
  const searchUserIdentity = userId;

  const [searchParams] = useSearchParams();
  const tourName = searchParams.get('tour') || 'all';
  const { data: reviews, isLoading,refetch } = useQuery({
    queryKey: [`reviews-user-${searchUserIdentity}`, tourName],
    queryFn: () => getAllReviewsOfSpecificUser({ userId: searchUserIdentity }),
    staleTime:0,
    cacheTime: 0,  
    // enabled: !!userId && userId !== undefined,
    refetchOnMount:true,
    refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  enabled:!!userId&&userId!==undefined
 
  });

  return { reviews, isLoading1: isLoading,refetch };
};
export const useWriteNewReview = () => {
  const queryClient = useQueryClient();
  const { mutate: writeReview, isLoading: isWriting } = useMutation({
    mutationFn: writeNewReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (queries) =>
          queries.queryKey[0].startsWith(`booking`) ||
          queries.queryKey[0].startsWith(`reviews`),
      });
      toast.success('New review added');
    },
    onError: () => toast.error('Cannot add review'),
  });
  return { writeReview, isWriting };
};
export const useUpdateReview = (onClose) => {
  const {user}=useContext(UserContext)
  const [searchParams]=useSearchParams()
  const tourName=searchParams.get('tour')||'all'
  const queryClient = useQueryClient();
  const {handleReload}=useContext(ReviewContext)


  const { mutate: updateReview, isLoading: isUpdating } = useMutation({
    mutationFn: updateAReview,
    onSettled: (data) => {
      queryClient
        .invalidateQueries(
        [`reviews-user-${user.id}`,tourName]
        ).then(()=>handleReload())
        .then(() => toast.success('Your review has been updated')).then(()=>onClose());
    },
    onError: (error) => toast.error(error),
  });
  return { updateReview, isUpdating };
};
export const useDeleteReview =()=>{
  const queryClient=useQueryClient()
  const {handleReload}=useContext(ReviewContext)
  const {mutate:deleteReview,isLoading:isDeleting}=useMutation({
    mutationFn:({reviewId})=>deleteReviewApi({reviewId}),
    onSettled:()=>{
      queryClient.invalidateQueries({
        predicate: (queries) =>
          queries.queryKey[0].startsWith(`booking`) ||
          queries.queryKey[0].startsWith(`reviews`),
      }).then(()=>handleReload())
      .then(() => toast.success('Your review has been deleted'))
     
    },
    onError: () => toast.error('Cannot delete review'),
    
  })
  return {deleteReview,isDeleting}
}
