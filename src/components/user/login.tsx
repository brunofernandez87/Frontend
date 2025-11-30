import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import "../../styles/user/login.css";

export default function Login() {
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/profile/${user}/${password}`);
  }
  return (
    <div className="Container-Login">
      <form onSubmit={handleLogin} className="form-Login">
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          name="username"
          required
          value={user}
          onChange={(e) => setuser(e.target.value)}
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
        <button
          onClick={() => setshowpassword(!showpassword)}
          type="button" /*cambiar por ojo*/
        >
          {showpassword ? <LuEyeClosed /> : <LuEye />}
        </button>
        <button type="submit" id="iniciar_sesion" className="button-login">
          Iniciar Sesión
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
