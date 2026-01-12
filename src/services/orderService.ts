import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/order`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orderService:", error);
    return [];
  }
};
export const eliminateOrder = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/order/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminate order ", error);
    throw error;
  }
};
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error create order", error);
    throw error;
  }
};
