import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: (userForm) => updateUserApi(userForm),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success('User updated');
      queryClient.invalidateQueries({
        predicate: (queries) =>
          queries.queryKey[0].startsWith(`users`)
         
      });
    },
  });
  return { updateUser, isUpdating };
}