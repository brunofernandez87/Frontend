import { useMemo, useState } from "react";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import "../styles/cart.css";
import { useUser } from "../context/userContext";
import { useOrderList } from "../context/orderListContext";
// import { useOrderDetailList } from "../context/orderDetailListContext";
import { createDetail } from "../services/orderDetailService";
import { createOrder } from "../services/orderService";
const getProductImage = (product) => product.image;
export default function Cart() {
  const [loading, setLoading] = useState(false);
  // const { setorderDetailList } = useOrderDetailList();
  const { user } = useUser();
  const { setorderList } = useOrderList();
  const { cartContent, setcartContent, updateQuantity } = useCart(); // Calcula el total a pagar
  const total = useMemo(() => {
    return cartContent.reduce(
      // Suma el precio por la cantidad
      (sum, product) => sum + product.price * (product.quantity || 1),
      0
    );
  }, [cartContent]);
  const isCartEmpty = cartContent.length === 0;
  async function handleBuy() {
    if (!user) {
      toast.error("Requiere iniciar sesion para comprar");
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        id_user: user.id_user,
        date: new Date().toISOString().slice(0, 10),
        total: total,
        state: "en preparacion",
      };
      const createdOrder = await createOrder(orderData);
      const orderId = createdOrder.result
        ? createdOrder.result.id_order
        : createdOrder.id_order;
      if (!orderId) throw new Error("No se recibió ID de la orden");
      if (orderId) {
        const detailPromises = cartContent.map((prod) => {
          return createDetail({
            id_order: orderId,
            id_product: prod.id_product,
            amount: prod.quantity || 1,
            unit_price: prod.price,
          });
        });
        await Promise.all(detailPromises);
        toast.success("Productos Comprados"); // Muestra una notificación
        setorderList((prevList) => [...prevList, createdOrder.result]);
        setcartContent([]); // Vacía el carrito despues de la compra
      } else {
        toast.error("No se pudo procesar la compra");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar la compra. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cart-page-container">
      <h3 className="cart-title">Tu Carrito de Compras</h3>
      {isCartEmpty ? (
        <div className="cart-empty-container">
          <p className="cart-empty-message">Tu carrito está vacío 🧺</p>
        </div>
      ) : (
        <div className="cart-content-wrapper">
          <div className="cart-item-list">
            {cartContent.map((product) => (
              <div key={product.id_product} className="cart-item">
                <div className="item-info">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="item-image" // fijar el tamaño de la imagen.
                  />
                  <span className="item-name">{product.name}</span>
                </div>
                <div className="item-quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.id_product,
                        (product.quantity || 1) - 1
                      )
                    }
                    className="qty-btn remove-btn"
                  >
                    −
                  </button>
                  <span className="item-quantity">{product.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.id_product,
                        (product.quantity || 1) + 1
                      )
                    }
                    className="qty-btn add-btn"
                  >
                    +
                  </button>
                </div>
                <span className="item-price">
                  ${(product.price * (product.quantity || 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total a Pagar:</span>
              <span className="total-value">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleBuy}
              className="buy-button"
              disabled={loading}
            >
              Comprar Todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
