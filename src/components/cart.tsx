import { useMemo, useState } from "react";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import "../styles/cart.css";
import { useUser } from "../context/userContext";
import { useOrderList } from "../context/orderListContext";
import { useProductList } from "../context/productListContext";
import { createDetail } from "../services/orderDetailService";
import { createOrder } from "../services/orderService";

const getProductImage = (product) => product.image;

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { setorderList } = useOrderList();
  const { fetchProducts } = useProductList();
  const { cartContent, setcartContent, updateQuantity } = useCart();

  const total = useMemo(() => {
    return cartContent.reduce(
      (sum, product) => sum + product.price * (product.quantity || 1),
      0,
    );
  }, [cartContent]);

  const isCartEmpty = cartContent.length === 0;

  async function handleBuy() {
    if (!user) {
      toast.error("Requiere iniciar sesion para comprar");
      return;
    }

    const userId = user.id_user || user.id;

    if (!userId) {
      console.error("ERROR CRÍTICO: El usuario no tiene ID", user);
      toast.error("Error con tu sesión. Por favor sal y vuelve a entrar.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        id_user: userId,
        date: new Date().toISOString().slice(0, 10),
        total: total,
        state: "en preparacion",
      };

      // Crear Orden
      const createdOrderResponse = await createOrder(orderData);

      // Manejo de respuesta flexible
      const createdOrder = createdOrderResponse.result || createdOrderResponse;
      const orderId = createdOrder.id_order;

      if (!orderId) throw new Error("No se recibió ID de la orden");

      // Crear Detalles
      const detailPromises = cartContent.map((prod) => {
        return createDetail({
          id_order: orderId,
          id_product: prod.id_product,
          amount: prod.quantity || 1,
          unit_price: prod.price,
        });
      });

      await Promise.all(detailPromises);

      toast.success("¡Compra exitosa! Te enviamos los detalles por correo 📧");

      // Recargar productos para ver stock actualizado
      if (fetchProducts) {
        await fetchProducts();
      }

      setorderList((prevList) => [...prevList, createdOrder]);
      setcartContent([]);
    } catch (error: any) {
      console.error(error);
      // Mensaje específico (Stock insuficiente)
      if (error.response && error.response.data) {
        const msg = error.response.data.message || error.response.data;
        toast.error(`Error: ${msg}`);
      } else {
        toast.error("Error al procesar la compra.");
      }
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
                    className="item-image"
                  />
                  <span className="item-name">{product.name}</span>
                </div>
                <div className="item-quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.id_product,
                        (product.quantity || 1) - 1,
                        product.stock,
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
                        (product.quantity || 1) + 1,
                        product.stock,
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
              {loading ? "Procesando..." : "Comprar Todo"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
