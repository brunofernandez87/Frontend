import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const cartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartContent, setcartContent] = useState([]);

  // Agrega un producto o incrementa su cantidad validando stock
  const addOrUpdateItem = (productToAdd) => {
    const existingItemIndex = cartContent.findIndex(
      (item) => item.id_product === productToAdd.id_product,
    );

    if (existingItemIndex > -1) {
      const currentQuantity = cartContent[existingItemIndex].quantity || 1;

      // Si ya alcanzamos el stock máximo disponible
      if (currentQuantity >= productToAdd.stock) {
        toast.error(
          `Lo sentimos, solo hay ${productToAdd.stock} unidades disponibles.`,
        );
        return;
      }

      const newCart = cartContent.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: currentQuantity + 1 };
        }
        return item;
      });

      setcartContent(newCart);
    } else {
      // Si el producto no tiene stock
      if (productToAdd.stock <= 0) {
        toast.error("Este producto no tiene stock disponible.");
        return;
      }

      const newItem = { ...productToAdd, quantity: 1 };
      setcartContent([...cartContent, newItem]);
      toast.success("Producto añadido al carrito");
    }
  };

  // Actualiza la cantidad desde los botones + y - del carrito
  const updateQuantity = (productId, newQuantity, maxStock) => {
    if (newQuantity > maxStock) {
      toast.error("No puedes superar el stock disponible");
      return;
    }

    if (newQuantity <= 0) {
      setcartContent(
        cartContent.filter((item) => item.id_product !== productId),
      );
    } else {
      setcartContent(
        cartContent.map((item) =>
          item.id_product === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartContent,
        setcartContent,
        addOrUpdateItem,
        updateQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(cartContext);
  if (!context)
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  return context;
}
