import { useState } from "react";
import { recoveryPassword } from "../../services/userService";
import toast from "react-hot-toast";
import "../../styles/user/recovery.css";
export default function Recovery() {
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(false);
  const handlesubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await recoveryPassword(email);
      console.log(response);
      toast.success(
        "Correo de recuperación enviado (Revisa tu bandeja de entrada)",
        {
          duration: 4000,
        },
      );
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("El correo electrónico no está registrado");
      } else {
        toast.error("Error al enviar la solicitud. Intenta más tarde.");
      }
    } finally {
      setLoading(false);
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
        <button type="submit" className="button-recovery" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Mail"}
        </button>
      </form>
    </div>
  );
}
