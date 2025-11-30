import { useState } from "react";
import "../../styles/user/changePassword.css";
import { useUser } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserList } from "../../context/userListContext";
export default function ChangePassword() {
  const { user, setuser } = useUser();
  const { userList, setuserList } = useUserList();
  const navigate = useNavigate();
  const [newpassword, setnewpassword] = useState("");
  const [repeatpassword, setrepeatpassword] = useState("");
  const visibility =
    newpassword.trim() !== "" &&
    repeatpassword.trim() !== "" &&
    newpassword == repeatpassword;
  if (!user) {
    const error = "sesion no iniciada";
    return <Navigate to={`/error/${error}`} replace />;
  }
  const password = user.password_hash;
  function validator({ actualpassword, newPassword }) {
    if (actualpassword != password) {
      alert("La contraseña actual no coincide");
      return true;
    }
    if (newPassword == password) {
      alert("No se puede tener la misma contraseña");
      return true;
    }
    return false;
  }
  function modificatedPassword(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = validator({
      actualpassword: formData.get("password"),
      newPassword: formData.get("newPassword"),
    });
    if (result == false) {
      const newuser = {
        ...user,
        password_hash: formData.get("newPassword"),
      };
      setuser(newuser);
      const copyList = userList.map((u) => {
        if (u.id_user == newuser.id_user) {
          return newuser;
        }
        return u;
      });
      setuserList(copyList);
      navigate(`/profile/${newuser.username}/${newuser.password_hash}`);
    }
  }
  return (
    <div className="change-password-container">
      <form onSubmit={modificatedPassword} className="change-password-form">
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
          disabled={!visibility}
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
}
