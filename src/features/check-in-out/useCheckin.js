import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
    const queryClient=useQueryClient()
    const navigate=useNavigate()
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn:  updateBooking,
    onSuccess:(data)=>{ 
        toast.success(`Booking #${data.id} successfully checked in`);
        queryClient.invalidateQueries({active:true});
        // nav back to dashboard
        navigate('/admin')
    },
    onError:()=>{
        toast.error('There was an error during checking in')
    }
    
  });
  return {checkin,isCheckingIn}
}