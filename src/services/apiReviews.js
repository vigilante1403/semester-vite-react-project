import axios from 'axios';
export const getAllReviewsOfSpecificUser = async ({ userId }) => {
  const { data, error } = await axios.get(`/reviews/user/${userId}`);
  if (error) throw new Error(error.message);
  return data;
};
export const writeNewReview = async ({ tourId, userId, review, rating,shown,bookingId }) => {
  const { data, error } = await axios.post(`/reviews/add`, null, {
    params: {
      tour: tourId,
      user: userId,
      review,
      rating,
      shown,bookingId
    },
  });
  if (error) throw new Error(error.message);
  return data;
};
export const updateAReview = async ({
  tourId,
  userId,
  review,
  rating,
  shown,
  bookingId
}) => {
  const { data, error } = await axios.put(`/reviews/update`, null, {
    params: {
      tour: tourId,
      user: userId,
      review,
      rating,
      shown,
      bookingId
    },
  });
  if(error) throw new Error(error.message)
    return data;
};
export const deleteReviewApi =async ({reviewId})=>{
  const {error}=await axios.delete(`/reviews/delete?reviewId=${reviewId}`)
  if(error) throw new Error(error.message)
}
