import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "./userContext";
import { getAllOrders } from "../services/orderService";
const orderListContext = createContext(null);
export default function OrderListProvider({ children }) {
  const { user } = useUser();
  const [orderList, setorderList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getAllOrders();
        setorderList(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const filteredOrders = useMemo(() => {
    if (!user) {
      return [];
    }
    if (user.rol == "vendedor") {
      return orderList;
    }
    return orderList.filter((o) => o.id_user === user.id_user);
  }, [user, orderList]);

  return (
    <orderListContext.Provider
      value={{
        orderList: filteredOrders,
        setorderList,
        allOrders: orderList,
        loading,
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
