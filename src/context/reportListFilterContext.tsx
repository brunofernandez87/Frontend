import { createContext, useContext, useState, useEffect } from "react";
import { useReportList } from "./reportListContext";

const reportListFilterContext = createContext<any>(null);

export function ReportListFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { reportList } = useReportList();
  const [reportListFilter, setreportListFilter] = useState<any[]>(reportList);

  //Cuando reportList recibe los datos de la DB, actualizamos para que se vean en pantalla.
  useEffect(() => {
    setreportListFilter(reportList);
  }, [reportList]);

  return (
    <reportListFilterContext.Provider
      value={{ reportListFilter, setreportListFilter }}
    >
      {children}
    </reportListFilterContext.Provider>
  );
}

export function useReportListFilter() {
  const context = useContext(reportListFilterContext);
  if (!context) {
    throw new Error(
      "reportListFilter debe ser usado dentro de un ReportListFilterProvider"
    );
  }
  return context;
}
