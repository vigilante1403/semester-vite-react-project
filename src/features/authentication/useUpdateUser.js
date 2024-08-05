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
        queryKey: (queries) =>
          queries.filter(
            (query) =>
              query.startsWith(`user-email-${data.email}`) ||
              query.startsWith(`user-id-${data.id}`)
          ),
      });
    },
  });
  return { updateUser, isUpdating };
}
