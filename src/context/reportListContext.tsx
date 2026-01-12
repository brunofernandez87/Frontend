import { createContext, useContext, useState } from "react";

const reportListContext = createContext<any>(null);

export function ReportListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inicializamos con un array vacío para que los componentes no se rompan al cargar
  const [reportList, setreportList] = useState<any[]>([]);

  return (
    <reportListContext.Provider value={{ reportList, setreportList }}>
      {children}
    </reportListContext.Provider>
  );
}

export function useReportList() {
  const context = useContext(reportListContext);
  if (!context) {
    throw new Error(
      "reportList debe ser usado dentro de un ReportListProvider"
    );
  }
  return context;
}
