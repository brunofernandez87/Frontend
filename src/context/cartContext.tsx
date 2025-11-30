import { createContext, useContext, useState } from "react";

const cartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartContent, setcartContent] = useState([]); // Función para agregar un producto al carrito o incrementar su cantidad.

  const addOrUpdateItem = (productToAdd) => {
    // Busca si el producto ya existe en el carrito por su ID.
    const existingItemIndex = cartContent.findIndex(
      (item) => item.id_product === productToAdd.id_product
    );

    if (existingItemIndex > -1) {
      // Si existe: Incrementa la cantidad de ese ítem.
      const newCart = cartContent.map((item, index) => {
        if (index === existingItemIndex) {
          // Incrementa la cantidad
          const currentQuantity = item.quantity || 1;
          return { ...item, quantity: currentQuantity + 1 };
        }
        return item;
      });
      setcartContent(newCart);
    } else {
      const newItem = { ...productToAdd, quantity: 1 };
      setcartContent([...cartContent, newItem]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Si la cantidad es cero o menos: Eliminar el producto
      setcartContent(
        cartContent.filter((item) => item.id_product !== productId)
      );
    } else {
      // Si la cantidad es válida: Actualizar la cantidad
      setcartContent(
        cartContent.map((item) =>
          item.id_product === productId
            ? { ...item, quantity: newQuantity } // Sobrescribe la cantidad
            : item
        )
      );
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartContent,
        setcartContent, // Para vaciar el carrito completamente
        addOrUpdateItem, // Función principal para añadir/incrementar
        updateQuantity, // Función para +/- botones
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

// Para consumir el contextoen otros componentes
export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    // Lanza un error si el hook no se usa dentro del proveedor
    throw new Error("useCart debe ser usado dentro de un useCartProvider");
  }
  return context;
}
