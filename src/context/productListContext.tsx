import { createContext, useContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
// import productMock from "../mock/productMock.json";
const productListContext = createContext(null);
export function ProductListProvider({ children }) {
  const [productList, setproductList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    fetchProducts();
  }, []);
  return (
    <productListContext.Provider
      value={{ productList, setproductList, loading }}
    >
      {children}
    </productListContext.Provider>
  );
}
export function useProductList() {
  const context = useContext(productListContext);
  if (!context) {
    throw new Error(
      "productList debe ser usado dentro de un productListProvider"
    );
  }
  return context;
}
