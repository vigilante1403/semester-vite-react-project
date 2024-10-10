import axios from 'axios';
import toast from 'react-hot-toast';

export const getAllFavoriteUser = async ( userId ) => {
    console.log(userId);
    
   try { 
    const { data } = await axios.get(`/favorites/user?userId=${userId}`); 
     return data;
    } catch (e) {
// toast.error(e.response.data.message)
    }
   
  
  };

export const addFavoriteForUser = async ({ tourId, userId }) => {
  try {
    const data = await axios.post(`/favorites/user/add`, null, {
      params: {
        tourId,
        userId,
      },
    });
    return data;
  } catch (e) {
    toast.error(e.response.data.message);
  }
};

export const updateFavorite = async ({ tourId, userId, liked }) => {
  try {
    const { data } = await axios.put(`/favorites/user/change`, null, {
      params: {
        tourId,
        userId,
        liked,
      },
    });
    return data;
  } catch (e) {
    toast.error(e.response.data.message);
  }
};
export const removeAllFavorite =async (userId)=>{
    const {error}=await axios.delete(`/favorites/user/remove-all?userId=${userId}`)
    if(error) throw new Error(error.message)
  }