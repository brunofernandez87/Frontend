import { createContext, useContext, useState } from "react";
import reportMock from "../mock/reportMock.json";
const reportListContext = createContext(null);
export function ReportListProvider({ children }) {
  const [reportList, setreportList] = useState(reportMock);
  return (
    <reportListContext.Provider value={{ reportList, setreportList }}>
      {children}
    </reportListContext.Provider>
  );
}
export function useReportList() {
  const context = useContext(reportListContext);
  if (!context) {
    throw new Error("reportList debe ser usado dentro de un userListProvider");
  }
  return context;
}
