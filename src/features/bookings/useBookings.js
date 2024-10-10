import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelBooking as cancelBookingApi,
  getAllBookings,
  getBookingById,
  getBookingsByTourId,
  getBookingsOfUser,
  updateAllBookingsAfterUpdateTour,
} from '../../services/apiBookings';
import { useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookingsTotal() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const tourName = searchParams.get('tour') || 'all';
  const searchStatusValue = searchParams.get('status') || 'all';
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', currentPage],
    retry: false,
    queryFn: getAllBookings,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const pageCount = bookings ? Math.ceil(bookings.length / PAGE_SIZE) : 1;
  if (currentPage < pageCount) {
    queryClient.setQueryData(['tours', currentPage + 1], bookings);
  }
  if (currentPage > 1) {
    queryClient.setQueryData(['tours', currentPage - 1], bookings);
  }
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
export function useBookingById({bookIdIni=null}) {
  const { bookingId } = useParams();
  let bookId;
  if(bookingId){
    bookId=bookingId
  }else{
    bookId=bookIdIni
  }
  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', bookId], // arr
    queryFn: () => getBookingById(bookId), // func for fetch data from api returns a promise
    retry: false, // will try 3 times if fail
  });
  return { isLoading, booking };
}

export function useCancelBookingById() {
  const queryClient = useQueryClient();
  const { mutate: cancelBooking, isLoading: isCanceling } = useMutation({
    mutationFn: cancelBookingApi,
    onError: (err) => toast.error(err.message),
    onSuccess: (id) => {
      toast.success('Booking canceled');
      queryClient.invalidateQueries({
        predicate: (queries) => queries.queryKey[0].startsWith(`booking`),
      });
      queryClient.removeQueries({
        queryKey: [`booking-id-${id}`],
      });
    },
  });
  return { cancelBooking, isCanceling };
}
export function useUpdateAllRelatedBookings() {
  const { mutate: updateAllBookingsRelated, isLoading } = useMutation({
    mutationFn: updateAllBookingsAfterUpdateTour,
    onError: (err) => toast.error(err),
  });
  return { updateAllBookingsRelated, isLoading };
}
