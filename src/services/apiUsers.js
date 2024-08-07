import axios from 'axios';
import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';
export const getAllUsers = async () => {
  const { data, error } = await axios.get('/users');
  if (error) throw new Error(error.message);
  return data;
};
export const addNewUser = async (newUser) => {
  const { data, error } = await axios.post('/users/add', newUser);
  if (error) throw new Error(error.message);
  return data;
};
export const signUp = async (signupForm) => {
  const { data, error } = await axios.post('/users', signupForm);
  if (error) throw new Error(error.message);
  return data;
};
export const updateUser = async (updateUserForm) => {
  const { data, error } = await axios.put('/users', updateUserForm);
  if (error) throw new Error(error.message);
  return data;
};
export const deleteUser = async (id) => {
  const { error } = await axios.delete(`/users?id=${id}`);
  if (error) throw new Error(error.message);
  return id;
};
export const findUserByEmail = async (email) => {
  const { data, error } = await axios.get(`/users/email/${email}`);
  if (error) throw new Error(error.message);
  return data;
};
export const findUserById = async (id) => {
  const { data, error } = await axios.get(`/users/id/${id}`);
  if (error) throw new Error(error.message);
  return data;
};
export const login = async (userLoginForm) => {
  const { data, error } = await axios.post('/login');
  if (error) throw new Error(error.message);
  return data;
};
export const confirmLogin = async () => {
  // const cookieFind = Cookies.get('token-vtravel-lib0-authw') || null;
  // if (!cookieFind) return null;
  // const user = jwt.decode(cookieFind.trim()).sub;
  // const { data, error } = await axios.post('/authenticate', {
  //   username: user,
  //   token: cookieFind,
  // });
  // if (error) throw new Error(error.message);
  // return user;
};
export const getAllGuides = async ()=>{
  const {data,error}=await axios.get('/users/guides')
  if(error) throw new Error(error.message)
    return data;
}
