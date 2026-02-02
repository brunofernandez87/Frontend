import axios from "axios";

// Quitamos la barra final si existe en el .env
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};
// ... EL RESTO DEL ARCHIVO QUEDA IGUAL (registerUser, eliminateUser, etc.)
export const registerUser = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};
// ... (Copiar el resto de funciones que ya tenías: eliminateUser, changePassword, etc.)
export const eliminateUser = async (email: string, password: string) => {
  try {
    const response = await axios.delete(`${API_URL}/users/delete`, {
      data: {
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw error;
  }
};
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
  token: string,
) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/password/${userId}`,
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    throw error;
  }
};
export const recoveryPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/recovery`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error al recuperar contraseña:", error);
    throw error;
  }
};
export const updateUser = async (
  userId: string,
  data: FormData,
  token: string,
) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};
export const getAllUsers = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};
export const deleteUserId = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error eliminando usuario", error);
    throw error;
  }
};
