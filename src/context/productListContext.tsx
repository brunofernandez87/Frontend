import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
const productListContext = createContext(null);
export function ProductListProvider({ children }) {
  const [productList, setproductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setproductList(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <productListContext.Provider
      value={{ productList, setproductList, loading, fetchProducts }}
    >
      {children}
    </productListContext.Provider>
  );
}
export function useProductList() {
  const context = useContext(productListContext);
  if (!context) {
    throw new Error(
      "productList debe ser usado dentro de un productListProvider",
    );
  }
  return context;
}
