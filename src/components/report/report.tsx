import { useState, useEffect } from "react";
import image from "../../assets/mockReporte.jpg";
import ReportsCard from "./reportsCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/userContext";
import "../../styles/report/report.css";
import FilterCategory from "../filterCategory";
import { useReportList } from "../../context/reportListContext";
import { useReportListFilter } from "../../context/reportListFilterContext";
import SearchCategory from "../product/searchCategory";
import { getAllReports, createReportApi } from "../../services/reportService";

export default function Report() {
  const { id } = useParams();
  const { user } = useUser();
  const [page, setpage] = useState(1);
  const { reportList, setreportList } = useReportList();
  const { reportListFilter, setreportListFilter } = useReportListFilter();
  const navigate = useNavigate();

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
        if (data) {
          setreportList(data);
        }
      } catch (error) {
        console.error("Error al cargar reportes:", error);
      }
    };
    fetchReports();
  }, [setreportList]);

  const maxReports = 5;
  const totalReports = reportListFilter?.length || 0;
  const reports = (reportListFilter || []).slice(
    (page - 1) * maxReports,
    page * maxReports
  );

  const reportDetail = id
    ? (reportList || []).find((r: any) => r.id_report === parseInt(id))
    : null;

  async function createReport() {
    // Verificamos qué nombre tiene el usuario en tu contexto
    const nombreUsuario = user?.username || user?.name || "vendedor";

    const newReportRequest = {
      date_generated: new Date().toISOString(),
      generated_by_user: nombreUsuario,
    };

    try {
      const savedReport = await createReportApi(newReportRequest);
      if (savedReport) {
        const normalized = {
          ...savedReport,
          generated_by_user: savedReport.generated_by_user || nombreUsuario,
          date_generated:
            savedReport.date_generated ||
            savedReport.createdAt ||
            new Date().toISOString(),
          id_report: savedReport.id_report || savedReport.id || Date.now(),
        };
        setreportList((prev: any) => [...prev, normalized]);
        setpage(1);
      }
    } catch (error) {
      console.error("Error al crear:", error);
    }
  }

  return (
    <div className="report-page-container">
      <SearchCategory
        productFilt={reportList || []}
        setproductfilter={setreportListFilter}
        category="date_generated"
        label="Buscar por fecha DD/MM/YY"
      />

      {!reportDetail && (
        <div className="report-actions-wrapper">
          <button onClick={createReport}>Crear reporte</button>
        </div>
      )}

      {!reportDetail ? (
        <div className="report-list-container">
          <FilterCategory
            products={reportList || []}
            category={"generated_by_user"}
            filter={(e: any) => {
              const val = e.target.value;
              if (!val) {
                setreportListFilter(reportList);
              } else {
                setreportListFilter(
                  reportList.filter((r: any) => r.generated_by_user === val)
                );
              }
              setpage(1);
            }}
            label={"Visualizar todos los reportes"}
          />

          {reports.length > 0 ? (
            reports.map((r: any) => (
              <div
                key={r.id_report || r.id || Math.random()}
                className="Report-Cart"
              >
                <Link to={`/report/${r.id_report || r.id}`}>
                  <ReportsCard
                    image={image}
                    date={formatDate(r.date_generated || r.createdAt)}
                    username={r.generated_by_user || "vendedor"}
                    print={false}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p
              style={{ color: "white", textAlign: "center", marginTop: "20px" }}
            >
              Cargando reportes o lista vacía...
            </p>
          )}
        </div>
      ) : (
        <div className="report-detail-view">
          <button onClick={() => navigate("/report")}>← Volver</button>
          <ReportsCard
            image={image}
            date={formatDate(
              reportDetail.date_generated || reportDetail.createdAt
            )}
            username={reportDetail.generated_by_user || "vendedor"}
            print={true}
          />
        </div>
      )}

      {!reportDetail && totalReports > maxReports && (
        <div className="pagination-container">
          {page > 1 && (
            <button onClick={() => setpage(page - 1)}>Anterior</button>
          )}
          {page * maxReports < totalReports && (
            <button onClick={() => setpage(page + 1)}>Siguiente</button>
          )}
        </div>
      )}
    </div>
  );
}
