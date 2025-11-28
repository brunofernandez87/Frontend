import { createContext, useContext, useState } from "react";
import productMock from "../mock/productMock.json";
const productListContext = createContext(null);
export function ProductListProvider({ children }) {
  const [productList, setproductList] = useState(productMock);
  return (
    <productListContext.Provider value={{ productList, setproductList }}>
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
