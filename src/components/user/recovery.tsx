import userMock from "../../mock/userMock.json";
import { useState } from "react";
import { TbMailForward, TbMailX } from "react-icons/tb";
import "../../styles/user/recovery.css";
export default function Recovery() {
  const [email, setemail] = useState("");
  const handlesubmit = (event) => {
    const user = userMock.find((u) => u.email === email);
    if (user) {
      //HACER LO DE LA NOTIFICACION ACA!!!!!
      alert(
        <>
          <TbMailForward /> Se envio el correo
        </>
      );
    } else {
      event.preventDefault();
      alert(
        <>
          <TbMailX /> Email no encontrado
        </>
      );
    }
  };
  return (
    <div className="Container-recovery">
      <form onSubmit={handlesubmit} className="form-recovery">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <button type="submit" className="button-recovery">
          Enviar Mail
        </button>
      </form>
    </div>
  );
}
