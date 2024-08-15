import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
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
export const login = async (loginForm) => {
  const { data, error } = await axios.post('/login',loginForm);
  if (error) throw new Error(error.message);
  localStorage.setItem('username',data.email)
  return data;
};

export const confirmLogin = async () => {

  let user=localStorage.getItem('username')||null;
  if(user==null) throw new Error('Unauthorized user')

  const { data, error } = await axios.post(`/authenticate?username=${user}`);

  if (error) throw new Error(error.message);
  return user;
};


export const getAllGuides = async ()=>{
  const {data,error}=await axios.get('/users/guides')
  if(error) throw new Error(error.message)
    return data;
}
