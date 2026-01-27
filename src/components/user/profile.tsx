import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import "../../styles/user/profile.css";
import { eliminateUser } from "../../services/userService";
export default function Profile() {
  const navigate = useNavigate();
  const { user, setuser } = useUser();
  if (!user) {
    const error = "Sesion no iniciada";
    return <Navigate to={`/error/${error}`} replace />;
  }
  const { image, name, username, email } = user;
  // const textoOculto = "*".repeat(password_hash.length);
  function logout() {
    navigate("/", { replace: true });
    setTimeout(() => {
      setuser(null);
    }, 1);
  }
  async function deleteUser() {
    if (!window.confirm("Estas seguro de eliminar tu cuenta?")) {
      return;
    }
    const passwordConfirm = window.prompt(
      "Ingresa tu contraseña para confirmar:",
    );
    if (!passwordConfirm) return;
    try {
      await eliminateUser(user.email, passwordConfirm);
      navigate("/", { replace: true });
    } catch (error) {
      alert("Error: Contraseña incorrecta o fallo en el servidor");
    }
    setTimeout(() => {
      setuser(null);
    }, 1);
  }
  return (
    <div className="Div-Profile">
      <div className="Image-Profile">
        <img src={image} alt="Profile.png" />
      </div>
      <div className="Username-Profile">
        <p> Nombre: {name}</p>
      </div>
      <div className="Username-Profile">
        <p>Username: {username}</p>
      </div>
      <div className="Password-Profile">
        <p> Password:*****</p>
        {/* {showpassword ? <p>{password_hash}</p> : <p>{textoOculto}</p>}
        <button onClick={() => setshowpassword(!showpassword)}>
          {showpassword ? <LuEyeClosed /> : <LuEye />}
        </button> */}
      </div>
      <div className="Email-Profile">
        <p>Email: {email}</p>
      </div>
      <div className="ChangePassword-Profile">
        <Link to="/changePassword" title="Cambiar Contraseña">
          <button>Cambiar Contraseña</button>
        </Link>
      </div>
      <Link to={`/modificateUser`}>
        <button> Modificar</button>
      </Link>
      <button onClick={logout}>
        <MdLogout /> Cerrar sesion
      </button>
      <button onClick={deleteUser}>
        <FaRegTrashCan /> Eliminar Cuenta
      </button>
    </div>
  );
}
