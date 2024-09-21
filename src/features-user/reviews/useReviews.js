import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllReviewsOfSpecificUser,
  writeNewReview,
} from '../../services/apiReviews';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
export const useReviewsOfUser = (userId) => {
 
  const searchUserIdentity = userId;

  const [searchParams] = useSearchParams();
  const tourName = searchParams.get('tour')||'all'
  const { data: reviews, isLoading } = useQuery({
    queryKey: [`reviews-user-${searchUserIdentity}`,tourName],
    queryFn: () => getAllReviewsOfSpecificUser({ userId: searchUserIdentity }),
    enabled: !!userId && userId !== undefined,
  });
  
  return { reviews, isLoading1: isLoading };
};
export const useWriteNewReview = () => {
  const queryClient = useQueryClient();
  const { mutate: writeReview, isLoading: isWriting } = useMutation({
    mutationFn: writeNewReview,
    onSuccess: () => {
      toast.success('New review added');
      queryClient.invalidateQueries({
        predicate: (queries) => queries.queryKey[0].startsWith(`booking`),
      });
    },
    onError: () => toast.error('Cannot add review'),
  });
  return { writeReview, isWriting };
};
