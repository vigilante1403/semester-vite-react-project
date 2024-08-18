import axios from "axios";

export const getAllBills = async () => {
    const { data, error } = await axios.get('/bills');
    if (error) throw new Error(error.message);
    return data;
  };
  export const addBill = async (billForm) => {
    const { data, error } = await axios.post('/bills', billForm);
    if (error) throw new Error(error.message);
    return data;
  };