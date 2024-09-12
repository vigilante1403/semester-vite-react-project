import { useQuery } from '@tanstack/react-query';
import { activateAccount } from '../../services/apiUsers';
import { useParams } from 'react-router-dom';

export const useVerify = () => {
    const {email,token}=useParams();
  const { data: status, isLoading } = useQuery({
    queryFn: () => activateAccount({ email, token }),
    queryKey: ['activateStatus'],
  });
  if(!email||!token) return {statusVerified:false,isLoading:false}
  return { statusVerified:status!==undefined&&status!==null, isLoading };
};
