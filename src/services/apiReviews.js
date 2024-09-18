import axios from 'axios';
export const getAllReviewsOfSpecificUser = async ({userId})=>{
    const {data,error}=await axios.get(`/reviews/user/${userId}`)
    if(error) throw new Error(error.message)
      return data;
  }