import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelBooking as cancelBookingApi,
  getAllBookings,
  getBookingById,
  getBookingsByTourId,
  getBookingsOfUser,
} from '../../services/apiBookings';
import { useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useBookingsTotal() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    retry: false,
    queryFn: getAllBookings,
  });
  return { bookings, isLoading };
}
export function useBookingsByUser() {
  const [searchParams] = useSearchParams();
  const searchUserIdentity = searchParams.get('userId') || null;
  const { data: bookings, isLoading } = useQuery({
    queryKey: [`bookings-user-${searchUserIdentity}`],
    queryFn: getBookingsOfUser,
  });
  return { bookings, isLoading };
}
export function useBookingsByTour() {
  const [searchParams] = useSearchParams();
  const searchTourId = searchParams.get('tourId') || null;
  const { data: bookings, isLoading } = useQuery({
    queryKey: [`bookings-tour-${searchTourId}`],
    queryFn: getBookingsByTourId,
  });
  return { bookings, isLoading };
}
export function useBookingById() {
  const { bookingId } = useParams();
  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', bookingId], // arr
    queryFn: () => getBookingById(bookingId), // func for fetch data from api returns a promise
    retry: false, // will try 3 times if fail
  });
  return { isLoading, booking };
}

export function useCancelBookingById() {
  const queryClient = useQueryClient();
  const { mutate: cancelBooking, isLoading:isCanceling } = useMutation({
    mutationFn: cancelBookingApi,
    onError: (err) => toast.error(err.message),
    onSuccess: (id) => {
      toast.success('Booking canceled');
      queryClient.invalidateQueries({
        predicate: (queries) =>
            queries.queryKey[0].startsWith(`booking`)
      });
      queryClient.removeQueries({
        queryKey: [`booking-id-${id}`],
      });
    },
  });
  return { cancelBooking, isCanceling };
}
