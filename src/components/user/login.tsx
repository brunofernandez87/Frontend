import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import "../../styles/user/login.css";
import { useUser } from "../../context/userContext";
import { loginUser } from "../../services/userService";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { setuser } = useUser();
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setloading(true);
    try {
      const response = await loginUser(email, password);
      console.log("Login exitoso", response);
      setuser(response);
      toast.success(`Bienvenido ${response.username || email}!`);
      navigate("/profile");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Usuario o contraseña incorrectos");
      } else {
        toast.error("Error al iniciar sesión. Intenta más tarde.");
      }
    } finally {
      setloading(false);
    }
  }
  return (
    <div className="Container-Login">
      <form onSubmit={handleLogin} className="form-Login">
        <label htmlFor="username">Email:</label>
        <input
          type="email"
          name="username"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="input_login"
        />
        <label htmlFor="password_hash"> Password: </label>
        <input
          type={showpassword ? "text" : "password"}
          name="password_hash"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="input_login"
        />
        <button onClick={() => setshowpassword(!showpassword)} type="button">
          {showpassword ? <LuEyeClosed /> : <LuEye />}
        </button>
        <button
          type="submit"
          id="iniciar_sesion"
          className="button-login"
          disabled={loading}
        >
          {loading ? "Verificando..." : "Iniciar Sesion"}
        </button>
        <Link to="/register" title="Register">
          <button className="button-login">Registrarse</button>
        </Link>
        <Link to="/recovery" title="Recuperar Contraseña">
          <button className="button-login">Recuperar Contraseña</button>
        </Link>
      </form>
    </div>
  );
}
