import { Link } from "react-router-dom";
import LinkedInIcon from "../../assets/RedesSociales/linkedin.svg";
import InstagramIcon from "../../assets/RedesSociales/instagram-icon.svg";
import OutlookIcon from "../../assets/RedesSociales/microsoft-outlook.svg";
import WhatsappIcon from "../../assets/RedesSociales/whatsapp-icon.svg";
import MapsIcon from "../../assets/RedesSociales/googleMaps.svg";
import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contact">
        <p>
          <b>INFORMACION DE CONTACTO</b>
        </p>

        <div className="contact-info">
          <Link to="/contact" className="social-link mail-link">
            <img src={OutlookIcon} alt="Correo Icono" className="social-icon" />{" "}
            agroinsumos.contacto@hotmail.com
          </Link>

          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="social-link whatsapp-link"
          >
            <img
              src={WhatsappIcon}
              alt="WhatsApp Icono"
              className="social-icon"
            />{" "}
            +54 2916 XXX-XXXX{" "}
          </a>

          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="social-link Maps"
          >
            {" "}
            <img src={MapsIcon} alt="Maps Icono" className="social-icon" />{" "}
            Bahia Blanca Springfield 514
          </a>
        </div>
      </div>

      <Link to="/aboutUS">
        <button>ACERCA DE NOSOTROS</button>
      </Link>

      <div className="social-links">
        <h3>REDES SOCIALES</h3>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="social-link instagram-link"
        >
          <img
            src={InstagramIcon}
            alt="Instagram Icono"
            className="social-icon"
          />
          @AgroInsumos.BB
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="social-link linkedin-link"
        >
          <img
            src={LinkedInIcon}
            alt="LinkedIn Icono"
            className="social-icon"
          />
          Perfil LinkedIn
        </a>
      </div>
    </footer>
  );
}
