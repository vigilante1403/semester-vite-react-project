import axios from 'axios';
export const getAllBookings = async () => {
  const { data, error } = await axios.get('/bookings');
  if (error) throw new Error(error.message);
  return data;
};
export const getBookingsOfUser = async ({ userId }) => {
  // console.log('userId la:'+userId)
  const { data, error } = await axios.get(`/bookings/user/${userId + ''}`);
  if (error) throw new Error(error.message);
  return data;
};
export const getBookingsByTourId = async (tourId) => {
  const { data, error } = await axios.get(`/bookings/tour/${tourId}`);
  if (error) throw new Error(error.message);
  return data;
};
export const addBooking = async (bookingForm) => {
  const { data, error } = await axios.post('/bookings', bookingForm);
  if (error) throw new Error(error.message);
  return data;
};
export const updateBooking = async (bookingUpdateForm) => {
  const { data, error } = await axios.put('/bookings', bookingUpdateForm);
  if (error) throw new Error(error.message);
  return data;
};
export const deleteBooking = async (id) => {
  const { error } = await axios.delete(`/bookings?id=${id}`);
  if (error) throw new Error(error.message);
  return id;
};
export const getBookingById = async (id) => {
  const { data, error } = await axios.get(`/bookings/${id}`);
  if (error) throw new Error(error.message);
  return data;
};
export const getBookingsByDate = async (bookingForm) => {
  const { data, error } = await axios.post(
    '/bookings/from-to-dates',
    bookingForm
  );
  if (error) throw new Error(error.message);
  return data;
};
export const cancelBooking = async ({ bookingId }) => {
  const { error } = await axios.put(
    `/bookings/cancel-booking?bookingId=${bookingId}`
  );
  if (error) throw new Error(error.message);
};
export const updateAllBookingsAfterUpdateTour = async ({
  tourId,
  dateOfLocationAfter,
  dateOfGuideAfter,
}) => {
  const { data, error } = await axios.post(
    `/bookings/changing-related-booking-after-update-tour?tourId=${tourId}&dateOfLocationAfter=${dateOfLocationAfter}&dateOfGuideAfter=${dateOfGuideAfter}`
  );
  if (error) throw new Error(error.message);
  return data;
};
export const getAllUpcomingBookingOfSameTour = async ({ userId, tourId }) => {
  const { data, error } = await axios.get(
    `/bookings/user/booking-upcoming-related?userId=${userId}&tourId=${tourId}`
  );
  if (error) throw new Error(error.message);
  return data;
};
export const changeBookingPaymentSessionId = async ({
  bookingId,
  sessionId,
}) => {
  const { data, error } = await axios.post('/bookings/change-session', null, {
    params: {
      bookingId: bookingId,
      sessionId: sessionId,
    },
  });
  if (error) throw new Error(error.message);
  return data;
};
