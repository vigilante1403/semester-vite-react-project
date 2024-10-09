import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addFavoriteForUser,
  getAllFavoriteUser,
  removeAllFavorite,
  updateFavorite,
} from '../../services/apiFavorite';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../../ui/userLayout/ProtectedRouteUser';
import { useSearchParams } from 'react-router-dom';

export const useFavoriteOfUser = (userId) => {
  const { data: favorites, isLoading } = useQuery({
    queryKey: [`favorite-user-${userId}`],
    queryFn: () => getAllFavoriteUser({ userId }),
  });

  return { favorites, isLoading1: isLoading };
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const { mutate: addFavorite, isLoading: isAdding } = useMutation({
    mutationFn: addFavoriteForUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (queries) => queries.queryKey[0].startsWith(`favorite`),
      });
      toast.success('Add to favorite success');
    },
    onError: () => toast.error('Cannot add to favorite'),
  });
  return { addFavorite, isAdding };
};

export const useUpdateFavorite = () => {
  const queryClient = useQueryClient();

  const { mutate: changeFavorite, isLoading: isUpdating } = useMutation({
    mutationFn: updateFavorite,
    onSuccess: () => {
      toast.success('Your favorite has been remove');
      queryClient.invalidateQueries({
        queryKey: [`favorite-user`],
      });
    },
    onError: (error) => toast.error(error),
  });
  return { changeFavorite, isUpdating };
};


export const useDeleteAllFavorite =()=>{
    const queryClient=useQueryClient()
  
    const {mutate:deleteAllFavorite,isLoading:isDeleting}=useMutation({
      mutationFn:(userId)=>removeAllFavorite(userId),
      onSettled:()=>{
        queryClient.invalidateQueries({
          predicate: (queries) =>
            
            queries.queryKey[0].startsWith(`favorite`),
        })
        .then(() => toast.success('Your all favorites has been remove'))
       
      },
      onError: () => toast.error('Cannot delete all favorites'),
      
    })
    return {deleteAllFavorite,isDeleting}
  }
