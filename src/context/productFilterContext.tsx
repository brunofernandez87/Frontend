import { createContext, useContext, useState } from "react";
import { useProductList } from "./productListContext";
const productFilterContext = createContext(null);
export function ProductFilterProvider({ children }) {
  const { productList } = useProductList();
  const [productfilter, setproductfilter] = useState(productList);
  return (
    <productFilterContext.Provider value={{ productfilter, setproductfilter }}>
      {children}
    </productFilterContext.Provider>
  );
}
export function useProductFilter() {
  const context = useContext(productFilterContext);
  if (!context) {
    throw new Error(
      "productList debe ser usado dentro de un productListProvider"
    );
  }
  return context;
}
