import { createContext, useContext, useState } from "react";
import orderDetailMock from "../mock/orderDetailMock.json";
const orderDetailListContext = createContext(null);
export default function OrderDetailListProvider({ children }) {
  const [orderDetailList, setorderDetailList] = useState(orderDetailMock);
  return (
    <orderDetailListContext.Provider
      value={{ orderDetailList, setorderDetailList }}
    >
      {children}
    </orderDetailListContext.Provider>
  );
}
export function useOrderDetailList() {
  const context = useContext(orderDetailListContext);
  if (!context) {
    throw new Error(
      "orderDetailList debe ser usado dentro de un productListProvider"
    );
  }
  return context;
}
