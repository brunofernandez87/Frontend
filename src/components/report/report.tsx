import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/userContext";
import "../../styles/report/report.css";
import { useReportList } from "../../context/reportListContext";
import { useReportListFilter } from "../../context/reportListFilterContext";
import { DownloadIcon, TrashIcon, PdfIcon } from "./icons";
import {
  getAllReports,
  createReportApi,
  downloadReportByIdApi,
  deleteReportApi,
} from "../../services/reportService";

export default function Report() {
  const { id } = useParams();
  const { user } = useUser();
  const [page, setpage] = useState(1);
  const { reportList, setreportList } = useReportList();
  const { reportListFilter, setreportListFilter } = useReportListFilter();
  const navigate = useNavigate();

  const [reportType, setReportType] = useState("STOCK");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const formatDate = (dateStr: any) => {
    if (!dateStr) return "Sin fecha";
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return String(dateStr);
      return dateObj.toLocaleDateString("es-ES");
    } catch {
      return "Sin fecha";
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getAllReports();
        if (data) setreportList(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchReports();
  }, [setreportList]);

  useEffect(() => {
    let filtered = reportList || [];
    if (userFilter) {
      filtered = filtered.filter(
        (r: any) =>
          r.generated_by_user &&
          r.generated_by_user.toLowerCase().includes(userFilter.toLowerCase())
      );
    }
    if (dateFilter) {
      filtered = filtered.filter((r: any) => {
        const formatted = formatDate(r.date_generated || r.createdAt);
        return formatted.includes(dateFilter);
      });
    }
    setreportListFilter(filtered);
    setpage(1);
  }, [userFilter, dateFilter, reportList, setreportListFilter]);

  const maxReports = 8;
  const safeFilterList = reportListFilter || [];
  const totalReports = safeFilterList.length;
  const reports = safeFilterList.slice(
    (page - 1) * maxReports,
    page * maxReports
  );

  const reportDetail = id
    ? (reportList || []).find((r: any) => r.id_report === parseInt(id))
    : null;

  async function createReport() {
    const nombreUsuario = user?.username || user?.name || "vendedor";
    const fechaISO = new Date().toISOString();
    const newReportRequest = {
      date_generated: fechaISO,
      generated_by_user: nombreUsuario,
    };

    try {
      const blob = await createReportApi(newReportRequest, reportType);
      if (blob) {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `Reporte_${reportType}_${new Date().toLocaleDateString()}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        const updatedList = await getAllReports();
        setreportList(updatedList);
        alert("Reporte descargado con éxito");
      }
    } catch (error) {
      alert("No se pudo crear el reporte");
    }
  }

  const handleDownloadCard = async (e: any, reportId: number, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    const blob = await downloadReportByIdApi(reportId, type);
    if (blob) {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Reporte_Historico_${type}_${reportId}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      alert("Error: Este reporte es antiguo y no tiene datos guardados.");
    }
  };

  const handleDeleteCard = async (e: any, reportId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
      const result = await deleteReportApi(reportId);
      if (result) {
        const updatedList = reportList.filter(
          (r: any) => (r.id_report || r.id) !== reportId
        );
        setreportList(updatedList);
        if (reportDetail) navigate("/report");
      } else {
        alert("Error al eliminar el reporte");
      }
    }
  };

  const renderDetailTable = (report: any) => {
    const data = report.report_data;
    const type = report.type;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <p className="no-data-text">No hay datos archivados para mostrar.</p>
      );
    }

    if (type === "STOCK") {
      return (
        <div className="table-responsive">
          <table className="detail-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (type === "VENTAS") {
      return (
        <div className="table-responsive">
          <table className="detail-table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={index}>
                  <td>#{item.id}</td>
                  <td>
                    <span
                      className={`status-badge status-${item.state?.toLowerCase()}`}
                    >
                      {item.state}
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td className="font-bold">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return <p>Tipo de reporte desconocido</p>;
  };

  const getReportSummary = (report: any) => {
    const data = report.report_data;
    const type = report.type || "Generico";
    if (!data || !Array.isArray(data))
      return "Sin previsualización (Reporte antiguo)";

    if (type === "STOCK") {
      return `📦 ${data.length} Productos registrados`;
    } else if (type === "VENTAS") {
      const total = data.reduce((acc: number, item: any) => {
        const val = parseFloat(item.total.replace("$", "")) || 0;
        return acc + val;
      }, 0);
      return `💰 ${data.length} Ventas | Total: $${total.toLocaleString()}`;
    }
    return `${data.length} Registros`;
  };

  if (reportDetail) {
    return (
      <div className="report-page-container">
        <div className="detail-card-wrapper full-width">
          <div className="detail-header">
            <h2>Reporte #{reportDetail.id_report}</h2>
            <div className="detail-meta">
              <p>
                📅{" "}
                {formatDate(
                  reportDetail.date_generated || reportDetail.createdAt
                )}
              </p>
              <p>👤 {reportDetail.generated_by_user}</p>
            </div>
          </div>

          <div className="detail-content">
            {renderDetailTable(reportDetail)}
          </div>

          <div className="detail-actions">
            <button
              onClick={(e) =>
                handleDownloadCard(
                  e,
                  reportDetail.id_report || reportDetail.id,
                  reportDetail.type
                )
              }
              className="btn-action"
            >
              <DownloadIcon /> Descargar PDF
            </button>

            <button
              onClick={(e) =>
                handleDeleteCard(e, reportDetail.id_report || reportDetail.id)
              }
              className="btn-action btn-delete"
            >
              <TrashIcon /> Eliminar
            </button>

            <button
              onClick={() => navigate("/report")}
              className="btn-action btn-back-detail"
            >
              Volver al listado
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page-container">
      <div className="report-controls-bar">
        <div className="filters-group">
          <input
            type="text"
            placeholder="Buscar fecha (DD/MM/YY)..."
            className="control-input"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filtrar por usuario..."
            className="control-input"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          />
        </div>

        <div className="filters-group actions-group">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="control-input report-select"
          >
            <option value="STOCK">📄 Reporte de Stock</option>
            <option value="VENTAS">💰 Reporte de Ventas</option>
          </select>

          <button onClick={createReport} className="btn-action">
            <PdfIcon /> Nuevo Reporte
          </button>
        </div>
      </div>

      <div className="report-grid">
        {reports.length > 0 ? (
          reports.map((r: any) => {
            // Determinamos la clase para el color según el tipo (STOCK o VENTAS)
            const typeClass = r.type === "VENTAS" ? "type-sales" : "type-stock";

            return (
              <div key={r.id_report || r.id} className="report-card-modern">
                <div
                  className="card-clickable-area"
                  onClick={() => navigate(`/report/${r.id_report || r.id}`)}
                >
                  <div className="card-header-content">
                    <span className={`status-text ${typeClass}`}>
                      {r.type || "REPORTE"}
                    </span>
                    <span className="date-text">
                      {formatDate(r.date_generated || r.createdAt)}
                    </span>
                  </div>

                  <div className="card-body">
                    <p className="report-user">
                      Por: <span>{r.generated_by_user}</span>
                    </p>

                    <div className={`preview-box ${typeClass}-border`}>
                      {getReportSummary(r)}
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    onClick={(e) =>
                      handleDownloadCard(e, r.id_report || r.id, r.type)
                    }
                    className="btn-action btn-download"
                    title="Descargar copia PDF"
                  >
                    <DownloadIcon /> Descargar
                  </button>

                  <button
                    onClick={(e) => handleDeleteCard(e, r.id_report || r.id)}
                    className="btn-action btn-delete"
                    title="Eliminar reporte"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-reports-msg">
            No se encontraron reportes con esos filtros.
          </p>
        )}
      </div>

      {totalReports > maxReports && (
        <div className="pagination-container">
          <button
            onClick={() => setpage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span className="page-number">Página {page}</span>
          <button
            onClick={() => setpage((p) => p + 1)}
            disabled={page * maxReports >= totalReports}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
