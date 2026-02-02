import { useNavigate } from "react-router-dom";
import "../styles/contact.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { sendContactForm } from "../services/contactService";

export default function Contact() {
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [consultation, setconsultation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const visibility =
    name.trim() !== "" &&
    lastname.trim() !== "" &&
    email.trim() !== "" &&
    consultation.trim() !== "";

  async function handleClick(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      await sendContactForm({
        nombre: name,
        apellido: lastname,
        email: email,
        consulta: consultation,
      });

      toast.success("¡Consulta enviada! Te responderemos a la brevedad 📧");

      navigate("/");
    } catch (error) {
      toast.error("Hubo un error al enviar tu consulta. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contact-container">
      <form>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setname(e.target.value)}
        ></input>

        <label htmlFor="lastName">Apellido</label>
        <input
          type="text"
          name="lastName"
          required
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
        ></input>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        ></input>

        <label htmlFor="consultation">Consulta</label>
        <textarea
          name="consultation"
          required
          value={consultation}
          onChange={(e) => setconsultation(e.target.value)}
        ></textarea>

        <button
          type="button"
          onClick={handleClick}
          disabled={!visibility || loading} // Deshabilitar si carga
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Enviando..." : "Enviar Consulta"}
        </button>
      </form>
    </div>
  );
}
