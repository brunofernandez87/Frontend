import { createContext, useContext, useEffect, useState } from "react";
import { useOrderList } from "./orderListContext";
const orderListFilterContext = createContext(null);
export function OrderListFilterProvider({ children }) {
  const { orderList } = useOrderList();
  const [orderListFilter, setorderListFilter] = useState(orderList);
  useEffect(() => {
    setorderListFilter(orderList);
  }, [orderList]);
  return (
    <orderListFilterContext.Provider
      value={{ orderListFilter, setorderListFilter }}
    >
      {children}
    </orderListFilterContext.Provider>
  );
}
export function useOrderListFilter() {
  const context = useContext(orderListFilterContext);
  if (!context) {
    throw new Error(
      "orderListFilter debe ser usado dentro de un productListProvider"
    );
  }
  return context;
}
