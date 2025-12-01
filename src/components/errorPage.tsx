import { useParams } from "react-router-dom";
import fotoError from "../assets/error.png";
import "../styles/errorPage.css";
export default function Error() {
  const { error } = useParams();

  return (
    <div className="error-container">
      <div className="error-content-wrapper">
        <img
          src={fotoError}
          alt="Error en Agroinsumos"
          className="error-banner-image"
        />
        <p className="dynamic-error-message">⚠️ **Error:** {error}</p>
      </div>
    </div>
  );
}
