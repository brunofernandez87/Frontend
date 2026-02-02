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
import { useUserList } from "../../context/userListContext";

export default function Order() {
  const { orderList, setorderList } = useOrderList();
  const { orderListFilter, setorderListFilter } = useOrderListFilter();
  const { userList } = useUserList();
  const [page, setpage] = useState(1);
  const { user } = useUser();
  const maxItem = 5;
  const limit = page * maxItem;
  const limitAnt = limit - maxItem;
  const safeList = orderListFilter || [];

  // Invertir lista para recientes primero
  const sortedList = [...safeList].reverse();
  const orderFilter = sortedList.slice(limitAnt, limit);

  const [editOrderId, setEditOrderId] = useState(null);

  function handleClickNext() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page + 1);
  }

  function handleClickPrevious() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page - 1);
  }

  const getUserName = (id) => {
    if (!userList || userList.length === 0) return id;
    const foundUser = userList.find((u) => u.id_user === id);
    return foundUser ? foundUser.username : id;
  };

  const ordersForFilter = orderList.map((order) => ({
    ...order,
    username: getUserName(order.id_user),
  }));

  function filter(event) {
    const value = event.target.value;
    if (value === "") {
      setorderListFilter(orderList);
      setpage(1);
      return;
    }
    const result = orderList.filter((o) => getUserName(o.id_user) === value);
    setpage(1);
    setorderListFilter(result);
  }

  function handleStatusFilter(event) {
    const value = event.target.value;
    if (value === "") {
      setorderListFilter(orderList);
      setpage(1);
      return;
    }
    const result = orderList.filter((o) => o.state === value);
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
      toast.success("Pedido cancelado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al cancelar el pedido.");
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
      {/* Sección de Filtros */}
      <div className="filters-wrapper">
        <FilterCategory
          products={ordersForFilter}
          filter={filter}
          label={"Buscar orden de"}
          category={"username"}
        />
        <SearchCategory
          productFilt={orderList}
          setproductfilter={setorderListFilter}
          category="date"
          label="Buscar por fecha YY/MM/DD"
        />
        <div className="filter-item">
          <select
            onChange={handleStatusFilter}
            className="status-filter-select"
          >
            <option value="">Todos los estados</option>
            <option value="en preparacion">En preparación</option>
            <option value="en camino">En camino</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>
      </div>

      <div className="order-card-wrapper">
        {orderFilter.map((o) => {
          const isEditing = editOrderId === o.id_order;
          const usernameDisplay = getUserName(o.id_user);
          return (
            <div key={o.id_order} className="order-card">
              <Link
                to={`/orderDetail/${o?.id_order}`}
                className="order-details-link"
              >
                <div className="card-header">
                  <span className="order-date">📅 {o?.date}</span>
                  {!isEditing && (
                    <span className="order-state-badge">{o?.state}</span>
                  )}
                </div>

                <div className="card-body">
                  <span className="order-user">
                    Usuario: <strong>{usernameDisplay}</strong>
                  </span>
                  <span className="order-total-value">$ {o?.total}</span>
                </div>
              </Link>

              <div className="admin-actions-container">
                {user?.rol === "vendedor" && o.state !== "entregado" && (
                  <>
                    {isEditing ? (
                      <div className="admin-edit-wrapper">
                        <select
                          className="status-select-edit"
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
                          className="cancel-modify-btn"
                          onClick={() => setEditOrderId(null)}
                          title="Cancelar edición"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        className="modify-state-btn"
                        onClick={() => setEditOrderId(o.id_order)}
                      >
                        Modificar Estado
                      </button>
                    )}

                    {(o.state === "en preparacion" ||
                      o.state === "en camino") &&
                      !isEditing && (
                        <button
                          className="cancel-order-btn"
                          onClick={() => handleCancel(o.id_order)}
                        >
                          Cancelar Pedido
                        </button>
                      )}
                  </>
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
