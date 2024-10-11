import axios from 'axios';
import toast from 'react-hot-toast';

export const getAllBills = async () => {
  const { data, error } = await axios.get('/bills');
  if (error) throw new Error(error.message);
  return data;
};
export const fetchPaymentHistory = async (userEmail) => {
  try {
    const { data } = await axios.get(`/bills/${userEmail}`);
    return data.filter((payment) => payment.booking.paid === true);
  } catch (error) {
    return toast.error(error.response.data.message);
  }
};
export const addBill = async (billForm) => {
  const { data, error } = await axios.post('/bills', billForm);
  if (error) throw new Error(error.message);
  return data;
};
export const getBillsFromDate = async ({ date }) => {
  const { data, error } = await axios.get(
    `/bills/from-to-dates?dateFrom=${date}`
  );
  if (error) throw new Error(error.message);
  return data;
};
