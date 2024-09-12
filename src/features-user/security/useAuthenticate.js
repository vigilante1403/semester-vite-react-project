import { useQuery } from '@tanstack/react-query';
import { confirmLogin } from '../../services/apiUsers';

export function useAuthenticate() {
  const { data: currentUser,isLoading } = useQuery({
    queryKey: ['user-isSignedIn'],
    queryFn: confirmLogin,
  });

  return { user: currentUser, isAuthenticated: (currentUser !== null&&currentUser!==undefined),isLoading };
}
