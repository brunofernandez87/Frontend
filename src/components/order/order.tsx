import { Link } from "react-router-dom";
import { useOrderList } from "../../context/orderListContext";
import { useState } from "react";
import FilterCategory from "../filterCategory";
import "../../styles/order/order.css";
import { useOrderListFilter } from "../../context/orderListFilterContext";
import SearchCategory from "../product/searchCategory";
import { eliminateOrder, modifyOrder } from "../../services/orderService";
import { useUser } from "../../context/userContext";
import toast from "react-hot-toast";
export default function Order() {
  const { orderList, setorderList } = useOrderList();
  const { orderListFilter, setorderListFilter } = useOrderListFilter();
  const [page, setpage] = useState(1);
  const { user } = useUser();
  const maxItem = 5;
  const limit = page * maxItem;
  const limitAnt = limit - maxItem;
  const safeList = orderListFilter || [];
  const orderFilter = safeList.slice(limitAnt, limit);
  const [editOrderId, setEditOrderId] = useState(null);

  function handleClickNext() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page + 1);
  }
  function handleClickPrevious() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page - 1);
  }
  function filter(event) {
    const value = event.target.value;
    if (value == "") {
      setorderListFilter(orderList);
      setpage(1);
      return;
    }
    const result = orderList.filter((o) => o.id_user == value);
    setpage(1);
    setorderListFilter(result);
  }
  const handleCancel = async (id_order) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar este pedido?")) {
      return;
    }
    try {
      await eliminateOrder(id_order);
      setorderList((prevList) =>
        prevList.filter((r) => r.id_order !== id_order),
      );
      setorderListFilter((prevFilter) =>
        prevFilter.filter((r) => r.id_order !== id_order),
      );

      alert("Pedido cancelado y eliminado con éxito");
    } catch (error) {
      console.error(error);
      alert(
        "Error al cancelar el pedido. Verifica que no tenga detalles asociados o intenta más tarde.",
      );
    }
  };
  const handleModify = async (id_order, newState) => {
    try {
      await modifyOrder(id_order, newState);
      const updateLists = (list) =>
        list.map((order) => {
          if (order.id_order === id_order) {
            return { ...order, state: newState };
          }
          return order;
        });
      setorderList((prev) => updateLists(prev));
      setorderListFilter((prev) => updateLists(prev));
      toast.success(`Estado actualizado a: ${newState}`);
      setEditOrderId(null);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el estado");
    }
  };
  return (
    <div className="orders-page-container">
      <FilterCategory
        products={orderList}
        filter={filter}
        label={"buscar orden de"}
        category={"id_user"}
      />
      <SearchCategory
        productFilt={orderList}
        setproductfilter={setorderListFilter}
        category="date"
        label="buscar por fecha YY/MM/DD"
      />
      <div className="order-card-wrapper">
        {orderFilter.map((o) => {
          const isEditing = editOrderId === o.id_order;

          return (
            <div key={o.id_order} className="order-card">
              <Link
                to={`/orderDetail/${o?.id_order}`}
                className="order-details-link"
              >
                <span className="order-date">Fecha: {o?.date}</span>
                <div className="order-status-group">
                  {!isEditing && (
                    <span className="order-state">Estado: {o?.state}</span>
                  )}
                  <span className="order-user">Usuario: {o?.id_user}</span>
                </div>
                <span className="order-total-value">Total: ${o?.total}</span>
              </Link>
              <div>
                {user?.rol === "vendedor" && o.state !== "entregado" && (
                  <div className="admin-actions">
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "5px" }}>
                        <select
                          className="status-select"
                          value={o.state}
                          onChange={(e) =>
                            handleModify(o.id_order, e.target.value)
                          }
                          autoFocus
                        >
                          <option value="en preparacion">En preparación</option>
                          <option value="en camino">En camino</option>
                          <option value="entregado">Entregado</option>
                        </select>
                        <button
                          className="cancel-modify"
                          onClick={() => setEditOrderId(null)}
                          title="Cancelar edición"
                        >
                          ✖
                        </button>
                      </div>
                    ) : (
                      <button
                        className="modify-button"
                        onClick={() => setEditOrderId(o.id_order)}
                      >
                        Modificar Estado
                      </button>
                    )}
                  </div>
                )}
                {(o.state === "en preparacion" || o.state === "en camino") && (
                  <button
                    className="cancel-order-button"
                    onClick={() => {
                      handleCancel(o.id_order);
                    }}
                  >
                    Cancelar pedido
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination-container">
        {page > 1 && (
          <button className="Next-Page" onClick={handleClickPrevious}>
            Página anterior
          </button>
        )}
        {limit < orderListFilter.length && (
          <button className="Previous-Page" onClick={handleClickNext}>
            Página siguiente
          </button>
        )}
      </div>
    </div>
  );
}
//si es admin que le aparezcan todas las ordenes de todos los usuarios, que pueda filtrar por usuario, por estado o por fecha
