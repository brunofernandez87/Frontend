import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/report`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    return [];
  }
};

export const createReportApi = async (reportData: any, type: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/report`,
      { ...reportData, type },
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear reporte:", error);
    return null;
  }
};

export const downloadReportByIdApi = async (id: number, type: string) => {
  try {
    const response = await axios.get(`${API_URL}/report/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error al descargar historial:", error);
    return null;
  }
};

export const deleteReportApi = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/report/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar reporte:", error);
    return null;
  }
};
