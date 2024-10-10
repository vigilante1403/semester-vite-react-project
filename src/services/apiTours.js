import axios from 'axios';
export const getAllTours = async () => {
  const { data, error } = await axios.get('/tours');
  if (error) throw new Error(error.message);
  return data;
};
export const getTourByIdOrSlug = async ({id, slug}) => {
  console.log(id)
  var url = '/tours/';
  if (slug != null) {
    url += `slug/${slug}`;
  } else {
    url += `${id}`;
  }
  const { data, error } = await axios.get(url);
  if (error) throw new Error(error.message);
  return data;
};
export const addNewTour = async (tour) => {
  const { data, error } = await axios.post('/tours', tour,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (error) throw new Error(error.message);
  return data;
};
export const updateTour = async (tour) => {
  const { data, error } = await axios.post('/tours', tour,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (error) throw new Error(error.message);
  return data;
};
export const deleteTour = async (id) => {
  await axios.delete(`/tours?id=${id}`);
  // if (error) throw new Error(error.message);
  return id;
};
export const deleteTourTemp=async ({tourId})=>{
  await axios.delete(`/tours/tour/hidden-temp?tourId=${tourId}`)
  return tourId
}
export const getTourNearMe = async (locationForm) => {
  const { data, error } = await axios.post('/tours/tourNearByMe', locationForm);
  if (error) throw new Error(error.message);
  return data;
};
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,region,ccn3';

export const getAllCountries = async () => {
  const {data,error} = await axios.get(API_URL);
  const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  if(error) throw new Error(error.message)
  return sortedCountries;
};
export const addStartDatesOfTour = async(form)=>{
  const {data,error}=await axios.post('/tours/add/startDate',form)
  if(error) throw new Error(error.message)
    return data;
}
export const editStartDatesOfTour = async(form)=>{
  const {data,error}=await axios.post('/tours/edit/startDate',form)
  if(error) throw new Error(error.message)
    return data;
}
export const getAllSchedules = async()=>{
  const {data,error}=await axios.get('/tours/get-all-schedules')
  if(error) throw new Error(error.message)
    return data;
}
export const getAllSchedulesOfAGuide = async({guideId})=>{
  const {data,error}=await axios.get(`/tours/get-all-schedules-of-a-guide?guideId=${guideId}`)
  if(error) throw new Error(error.message)
    return data;
}
export const getAllSchedulesOfATour = async({tourId})=>{
  const {data,error}=await axios.get(`/tours/get-all-schedules-of-a-tour?tourId=${tourId}`)
  if(error) throw new Error(error.message)
    return data;
}
export const getDetailSchedule = async({scheduleId})=>{
  const {data,error}=await axios.get(`/tours/get-detail-schedule?scheduleId=${scheduleId}`)
  if(error) throw new Error(error.message)
    return data;
}
export const getAllStartDatesOfATour=async({tourId})=>{
  const {data,error}=await axios.get(`/tours/get-all-startDates-of-a-tour?tourId=${tourId}`)
  if(error)throw new Error(error.message)
    return data;
}
export const getAllStartDates = async()=>{
  const {data,error}=await axios.get('/tours/get-all-startDates')
  if(error) throw new Error(error.message)
    return data;
}
export const cancelAStartDate = async(form)=>{
  const {data,error}=await axios.post('/tours/cancel/startDate',form)
  if(error) throw new Error(error.message)
    return data;
}
export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");
  const data = await res.json();
  return data;
}
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export const fetchAddress = async ()=>{
    
    // we need to handle 3 states
      // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  // 3) Then we return an object with the data that we are interested in
  //payload of fulfilled state
  return { position, address };
}
export const getAllSchedulesFromASingleBookingId= async({bookingId})=>{
  const {data,error}=await axios.get(`/tours/schedules/from-a-bookingId?bookingId=${bookingId}`);
  if(error) throw new Error(error.message)
    return data;
}

