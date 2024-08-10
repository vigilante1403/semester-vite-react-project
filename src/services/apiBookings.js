import axios from 'axios';
export const getAllBookings = async () => {
  const { data, error } = await axios.get('/bookings');
  if (error) throw new Error(error.message);
  return data;
};
export const getBookingsOfUser = async (userId) => {
  const { data, error } = await axios.get(`/bookings/user/${userId}`);
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
