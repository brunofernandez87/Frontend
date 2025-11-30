import { useState } from "react";
import { useUserList } from "../../context/userListContext";
import "../../styles/user/register.css";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const { userList, setuserList } = useUserList();
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = userList.find((u) => u.email === email);
    const image = URL.createObjectURL(formData.get("image"));
    if (user) {
      alert("El email ya esta en uso");
    } else {
      const date = new Date();
      const newUser = {
        id_user: userList.length + 1,
        email: formData.get("email"),
        password_hash: formData.get("password_hash"),
        rol: "cliente",
        create: date,
        name: formData.get("name"),
        image: image,
        username: formData.get("username"),
      };
      setuserList([...userList, newUser]);
      alert("Usuario Registrado");
      navigate("/login");
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
