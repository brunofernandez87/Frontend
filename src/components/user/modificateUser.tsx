import { useUser } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserList } from "../../context/userListContext";
import "../../styles/user/modificateUser.css";
export default function ModificateUser() {
  const { user, setuser } = useUser();
  const { userList, setuserList } = useUserList();
  const navigate = useNavigate();
  if (!user) {
    const error = "Sesion no iniciada";
    return <Navigate to={`/error/${error}`} replace />;
  }
  function modificateUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = formData.get("image");
    let image = user.image;
    if (file && file.size > 0) {
      image = URL.createObjectURL(file);
    }
    const updatedUser = {
      ...user,
      email: formData.get("email"),
      name: formData.get("name"),
      image: image,
      username: formData.get("username"),
    };
    setuser(updatedUser);
    const copylist = userList.map((u) => {
      if (u.id_user === updatedUser.id_user) {
        return updatedUser;
      }
      return u;
    });
    setuserList(copylist);
    navigate(`/profile/${updatedUser.username}/${updatedUser.password_hash}`);
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
        <button type="submit">Guardar Cambios </button>
      </form>
    </div>
  );
}
