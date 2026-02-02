import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const sendContactForm = async (formData: {
  nombre: string;
  apellido: string;
  email: string;
  consulta: string;
}) => {
  try {
    // Enviamos los datos a la ruta
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error("Error enviando consulta:", error);
    throw error;
  }
};
