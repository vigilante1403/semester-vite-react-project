import { useMutation } from '@tanstack/react-query';
import { getLocation as getLocationApi } from '../../services/apiMap';
import toast from 'react-hot-toast';

export const useMapGetLocation = () => {
  const { mutate: getLocation, isLoading } = useMutation({
    mutationFn: getLocationApi,
    onError: (err) => toast.error(err),
  });
  return { getLocation, isLoading };
};
