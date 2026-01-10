import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/report`);
    console.log("Datos recibidos del GET:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    return [];
  }
};

export const createReportApi = async (reportData) => {
  try {
    const response = await axios.post(`${API_URL}/report`, reportData);
    console.log("Respuesta del servidor al CREAR:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear reporte:", error);
    return null;
  }
};
