import axios from 'axios';
export const getAllTours = async () => {
  const { data, error } = await axios.get('/tours');
  console.log(data);
  if (error) throw new Error(error.message);
  return data;
};
export const getTourByIdOrSlug = async (id, slug) => {
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
  const { data, error } = await axios.post('/tours', tour);
  if (error) throw new Error(error.message);
  return data;
};
export const updateTour = async (tour) => {
  const { data, error } = await axios.put('/tours', tour);
  if (error) throw new Error(error.message);
  return data;
};
export const deleteTour = async (id) => {
  const { error } = await axios.delete('/tours', id);
  if (error) throw new Error(error.message);
};
export const getTourNearMe = async (locationForm) => {
  const { data, error } = await axios.post('/tours/tourNearByMe', locationForm);
  if (error) throw new Error(error.message);
  return data;
};

