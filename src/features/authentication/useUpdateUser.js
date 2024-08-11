import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success('User updated');
      queryClient.invalidateQueries({
        predicate:
        (queries) =>queries.queryKey[0].startsWith(`user-email-${data.email}`)||queries.queryKey[0].startsWith(`user-id-${data.id}`)
          
      });
    },
  });
  return { updateUser, isUpdating };
}
