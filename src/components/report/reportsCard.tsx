import "../../styles/report/reportsCard.css";

export default function ReportsCard({ image, date, username, print }) {
  function clickPrint() {
    alert("Imprimiendoo");
  }
  return (
    <div className={`reports-card-content ${print ? "is-detail-view" : ""}`}>
      <div>
        <img src={image} alt="Imagen de un reporte en excel" />
      </div>
      <div>
        <p>
          Creado en: <strong>{date}</strong>
        </p>
      </div>
      <div>
        <p>
          Generado por: <strong>{username}</strong>
        </p>
      </div>
      {print && (
        <div>
          <button onClick={clickPrint}> Imprimir</button>
        </div>
      )}
    </div>
  );
}
