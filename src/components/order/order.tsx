import { Link } from "react-router-dom";
import { useOrderList } from "../../context/orderListContext";
import { useState } from "react";
import FilterCategory from "../filterCategory";
import "../../styles/order/order.css";
import { useOrderListFilter } from "../../context/orderListFilterContext";
import SearchCategory from "../product/searchCategory";
export default function Order() {
  const { orderList, setorderList } = useOrderList();
  const { orderListFilter, setorderListFilter } = useOrderListFilter();
  const [page, setpage] = useState(1);
  const maxItem = 5;
  const limit = page * maxItem;
  const limitAnt = limit - maxItem;
  const safeList = orderListFilter || [];
  const orderFilter = safeList.slice(limitAnt, limit);

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
        label="buscar por fecha DD/MM/YY"
      />
      <div className="order-card-wrapper">
        {orderFilter.map((o) => (
          <div key={o.id_order} className="order-card">
            <Link
              to={`/orderDetail/${o?.id_order}`}
              className="order-details-link"
            >
              <span className="order-date">Fecha: {o?.date}</span>
              <div className="order-status-group">
                <span className="order-state">Estado: {o?.state}</span>
                <span className="order-user">Usuario: {o?.id_user}</span>
              </div>
              <span className="order-total-value">Total: ${o?.total}</span>
            </Link>

            {(o.state === "en preparacion" || o.state === "en camino") && (
              <button
                className="cancel-order-button"
                onClick={() => {
                  setorderList((prevList) =>
                    prevList.filter((r) => r.id_order !== o.id_order)
                  );
                  setorderListFilter((prevFilter) =>
                    prevFilter.filter((r) => r.id_order !== o.id_order)
                  );
                  alert("Pedido eliminado");
                }}
              >
                Cancelar pedido
              </button>
            )}
          </div>
        ))}
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
