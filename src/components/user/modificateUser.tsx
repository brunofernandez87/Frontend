import { useUser } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { updateUser } from "../../services/userService";
import toast from "react-hot-toast";
import "../../styles/user/modificateUser.css";
import { useState } from "react";
export default function ModificateUser() {
  const { user, setuser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  if (!user) {
    const error = "Sesion no iniciada";
    return <Navigate to={`/error/${error}`} replace />;
  }
  async function modificateUser(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataToUpdate = {
      name: formData.get("name"),
      email: formData.get("email"),
      username: formData.get("username"),
      image: user.image,
    };
    try {
      const response = await updateUser(user.id_user, dataToUpdate, user.token);

      console.log("Respuesta del server:", response);
      const updatedUserContext = {
        ...user,
        ...dataToUpdate,
      };
      setuser(updatedUserContext);
      toast.success("Datos actualizados correctamente");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Error al actualizar");
      } else {
        toast.error("Error del servidor. Intenta más tarde.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="user-modification-container">
      <form onSubmit={modificateUser} className="user-modification-form">
        <img src={user.image} alt="Imagen Actual" />
        <label>Nueva Imagen:</label>
        <input type="file" name="image" placeholder="Imagen" />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          defaultValue={user.email}
          placeholder="Email"
        />
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          defaultValue={user.name}
          placeholder="Nombre"
        />
        <label> Username: </label>
        <input type="text" name="username" defaultValue={user.username} />
        <button type="submit">
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
