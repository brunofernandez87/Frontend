import { Navigate, useParams } from "react-router-dom";
import { useOrderDetailList } from "../../context/orderDetailListContext";
import { useProductList } from "../../context/productListContext";
import "../../styles/order/orderDetail.css";
export default function OrderDetail() {
  const { productList } = useProductList();
  const { id } = useParams();
  const { orderDetailList } = useOrderDetailList();
  const detail = orderDetailList.filter((d) => d.id_order == parseInt(id));
  if (!detail || detail.length == 0) {
    const error = "Detalle de orden no encontrado";
    return <Navigate to={`/error/${error}`} replace />;
  }
  return (
    <div className="order-detail-container">
      {detail.map((d) => {
        const product = productList.find((p) => p.id_product == d.id_product);
        return (
          <div key={d.id_detail} className="order-detail-item">
            <p> producto:{product?.name || "Desconocido"}</p>
            <p>monto:{d?.amount}</p>
            <p>precio unitario:{d?.unit_price}</p>
          </div>
        );
      })}
    </div>
  );
}
