import { useNavigate } from "react-router-dom";
import "../styles/contact.css";
import { useState } from "react";

export default function Contact() {
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [consultation, setconsultation] = useState("");
  const visibility =
    name.trim() !== "" &&
    lastname.trim() !== "" &&
    email.trim() !== "" &&
    consultation.trim() !== "";
  const navigate = useNavigate();
  function handleClick() {
    alert("consulta enviada contactaremos a la brevedad");
    navigate("/");
  }
  return (
    <div className="contact-container">
      <form>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          required
          onChange={(e) => setname(e.target.value)}
        ></input>
        <label htmlFor="lastName">Apellido</label>
        <input
          type="text"
          name="lastName"
          required
          onChange={(e) => setlastname(e.target.value)}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setemail(e.target.value)}
        ></input>
        <label htmlFor="consultation">Consulta</label>
        <textarea
          name="consultation"
          required
          onChange={(e) => setconsultation(e.target.value)}
        ></textarea>
        <button type="button" onClick={handleClick} disabled={!visibility}>
          Enviar Consulta
        </button>
      </form>
    </div>
  );
}
