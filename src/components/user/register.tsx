import { useState } from "react";
import "../../styles/user/register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userService";
import toast from "react-hot-toast";
export default function Register() {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setloading(true);
    const formData = new FormData(event.currentTarget);
    formData.append("rol", "cliente");
    try {
      await registerUser(formData);
      toast.success("¡Usuario registrado con éxito!");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Error al registrar usuario",
        );
      } else {
        toast.error("Ocurrió un error. Inténtalo más tarde.");
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="Container-Register">
      <form onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>
        <label>Imagen:</label>
        <input type="file" name="image" />
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Juan Perez"
          className="input-register"
        />
        <label htmlFor="username"> Username</label>
        <input
          type="text"
          name="username"
          required
          placeholder="Juan123"
          className="input-register"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="juanperez@email.com"
          className="input-register"
        />
        <label htmlFor="password_hash"> Password: </label>
        <input
          type="password"
          name="password_hash"
          required
          placeholder="************"
          className="input-register"
        />
        <button type="submit">
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
