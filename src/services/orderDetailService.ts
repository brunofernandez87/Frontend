import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const getOrderDetailID = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for order ${id}:`, error);
    return [];
  }
};
export const createDetail = async (detailData) => {
  try {
    const response = await axios.post(`${API_URL}/detail`, detailData);
    return response.data;
  } catch (error) {
    console.error("Error create order", error);
    throw error;
  }
};
