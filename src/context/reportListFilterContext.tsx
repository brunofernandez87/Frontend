import { createContext, useContext, useState } from "react";
import { useReportList } from "./reportListContext";

const reportListFilterContext = createContext(null);
export function ReportListFilterProvider({ children }) {
  const { reportList } = useReportList();
  const [reportListFilter, setreportListFilter] = useState(reportList);
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
      "reportListFilter debe ser usado dentro de un userListProvider"
    );
  }
  return context;
}
