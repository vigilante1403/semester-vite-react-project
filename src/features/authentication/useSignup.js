import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useSignup() {
  const queryClient = useQueryClient();
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success(
        'Signup successfully!. Please check email to activate account'
      );
    },
  });
  return { signup, isSigningUp };
}
