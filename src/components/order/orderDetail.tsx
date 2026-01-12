import { useParams } from "react-router-dom";
import { useProductList } from "../../context/productListContext";
import "../../styles/order/orderDetail.css";
import { useEffect, useState } from "react";
import { getOrderDetailID } from "../../services/orderDetailService";
export default function OrderDetail() {
  const { productList } = useProductList();
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await getOrderDetailID(id);
        if (!data || data.length === 0) {
          setError("No se encontraron detalles para esta orden.");
        } else {
          setDetails(data);
        }
      } catch (err) {
        setError("Error al cargar los detalles.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) return <div>Cargando detalle...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  return (
    <div className="order-detail-container">
      <h2>Detalle de Orden #{id}</h2>
      {details.map((d) => {
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
