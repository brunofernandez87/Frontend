import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { useUserList } from "../../context/userListContext";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import "../../styles/user/profile.css";
export default function Profile() {
  const { userList, setuserList } = useUserList();
  const [showpassword, setshowpassword] = useState(false);
  const navigate = useNavigate();
  const { setuser } = useUser();
  const { usernam, password } = useParams(); //despues cambiar usernam por una variable mas descriptiva
  const user = userList.find(
    (u) => u.username === usernam && u.password_hash === password
  );
  useEffect(() => {
    if (!user) {
      setuser(null);
    } else {
      setuser(user);
    }
  }, [user, setuser]);
  if (!user) {
    const error = "Sesion no iniciada";
    return <Navigate to={`/error/${error}`} replace />;
  }
  const { image, name, username, password_hash, email } = user;
  const textoOculto = "*".repeat(password_hash.length);
  function logout() {
    setuser(null);
    navigate("/", { replace: true });
  }
  function deleteUser() {
    if (!window.confirm("Estas seguro de eliminar tu cuenta?")) {
      return;
    }
    const listFilt = userList.filter((u) => u.id_user != user.id_user);
    navigate("/", { replace: true });
    setTimeout(() => {
      setuserList(listFilt);
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
        <p> Password:</p>
        {showpassword ? <p>{password_hash}</p> : <p>{textoOculto}</p>}
        <button onClick={() => setshowpassword(!showpassword)}>
          {showpassword ? <LuEyeClosed /> : <LuEye />}
        </button>
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
      <button onClick={deleteUser} 
        <FaRegTrashCan /> Eliminar Cuenta
      </button>
    </div>
  );
}
