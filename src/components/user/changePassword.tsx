import { useState } from "react";
import "../../styles/user/changePassword.css";
import { useUser } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { changePassword } from "../../services/userService";

export default function ChangePassword() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [newpassword, setnewpassword] = useState("");
  const [repeatpassword, setrepeatpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const visibility =
    newpassword.trim() !== "" &&
    repeatpassword.trim() !== "" &&
    newpassword === repeatpassword;

  if (!user) {
    const error = "sesion no iniciada";
    return <Navigate to={`/error/${error}`} replace />;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const currentPasswordInput = formData.get("password");

    // Validaciones
    if (newpassword !== repeatpassword) {
      toast.error("Las nuevas contraseñas no coinciden");
      return;
    }
    if (currentPasswordInput === newpassword) {
      toast.error("La nueva contraseña no puede ser igual a la actual");
      return;
    }
    setLoading(true);
    try {
      await changePassword(
        user.id_user,
        currentPasswordInput,
        newpassword,
        user.token,
      );
      toast.success("¡Contraseña cambiada con éxito!");
      navigate("/profile");
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Error al cambiar contraseña",
        );
      } else {
        toast.error("Error de servidor. Intenta más tarde.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="change-password-container">
      <form onSubmit={handleSubmit} className="change-password-form">
        <label htmlFor="password">Contraseña Actual</label>
        <input type="password" name="password" required />
        <label htmlFor="newPassword">Nueva Contraseña</label>
        <input
          type="password"
          name="newPassword"
          required
          onChange={(e) => setnewpassword(e.target.value)}
        />
        <label htmlFor="RepeatNewPassword">Repita Su Nueva Contraseña</label>
        <input
          type="password"
          name="RepeatNewPassword"
          required
          onChange={(e) => setrepeatpassword(e.target.value)}
        />
        <button
          type="submit"
          className="change-password-button"
          disabled={!visibility || loading}
        >
          {loading ? "Actualizando..." : "Cambiar Contraseña"}
        </button>
      </form>
    </div>
  );
}
