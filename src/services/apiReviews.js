import axios from 'axios';
export const getAllReviewsOfSpecificUser = async ({ userId }) => {
  const { data, error } = await axios.get(`/reviews/user/${userId}`);
  if (error) throw new Error(error.message);
  return data;
};
export const writeNewReview = async ({ tourId, userId, review, rating }) => {
  const { data, error } = await axios.post(`/reviews/add`, null, {
    params: {
      tour:tourId,
      user:userId,
      review,
      rating,
    },
  });
  if (error) throw new Error(error.message);
  return data;
};
