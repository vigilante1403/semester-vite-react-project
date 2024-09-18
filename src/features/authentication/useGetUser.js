import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { findUserByEmail, findUserById, getTokenAuthorized } from '../../services/apiUsers';

export function useGetUserByEmail() {
  const [searchParams] = useSearchParams();
  const searchEmailValue = searchParams.get('email') || null;
  const { data: user, isLoading: isFinding } = useQuery({
    queryKey: [`user-email-${searchEmailValue}`],
    queryFn: findUserByEmail,
  });
  return { user, isFinding };
}
export function useGetUserById() {
  const [searchParams] = useSearchParams();
  const searchIdValue = searchParams.get('id') || null;
  const { data: user, isLoading: isFinding } = useQuery({
    queryKey: [`user-id-${searchIdValue}`],
    queryFn: findUserById,
  });
  return { user, isFinding };
}
export function useGetUserToken(){
  const{data:token,isLoading}=useQuery({
    queryFn: getTokenAuthorized,
    queryKey:[`user-token`]
  })
  return {token,isLoading}
}
