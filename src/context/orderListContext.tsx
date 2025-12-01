import { createContext, useContext, useMemo, useState } from "react";
import { useUser } from "./userContext";
import orderMock from "../mock/orderMock.json";
const orderListContext = createContext(null);
export default function OrderListProvider({ children }) {
  const { user } = useUser();
  const [orderList, setorderList] = useState(orderMock);
  const filteredOrders = useMemo(() => {
    if (!user) {
      return [];
    }
    if (user.rol == "vendedor") {
      return orderList;
    }
    return orderList.filter((o) => o.id_user === user.username);
  }, [user, orderList]);

  return (
    <orderListContext.Provider
      value={{
        orderList: filteredOrders,
        setorderList,
        allOrders: orderList,
      }}
    >
      {children}
    </orderListContext.Provider>
  );
}
export function useOrderList() {
  const context = useContext(orderListContext);
  if (!context) {
    throw new Error(
      "orderList debe ser usado dentro de un productListProvider"
    );
  }
  return context;
}
