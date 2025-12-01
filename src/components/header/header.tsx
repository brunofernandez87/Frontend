import { Link } from "react-router-dom";
import logo from "../../assets/Logo eccomerce.jpeg";
import { useUser } from "../../context/userContext";
import { FaShoppingCart } from "react-icons/fa";
import "../../styles/header.css";
import { useProductList } from "../../context/productListContext";
import { useProductFilter } from "../../context/productFilterContext";
import { useUserList } from "../../context/userListContext";
import { useUserListFilter } from "../../context/userListFilterContext";
import { useReportList } from "../../context/reportListContext";
import { useReportListFilter } from "../../context/reportListFilterContext";
import { useOrderList } from "../../context/orderListContext";
import { useOrderListFilter } from "../../context/orderListFilterContext";
export default function Header() {
  const { productList } = useProductList();
  const { setproductfilter } = useProductFilter();
  const { userList } = useUserList();
  const { setuserListFilter } = useUserListFilter();
  const { reportList } = useReportList();
  const { setreportListFilter } = useReportListFilter();
  const { orderList } = useOrderList();
  const { setorderListFilter } = useOrderListFilter();
  const { user } = useUser();
  return (
    <header className="header-main">
      <div className="Logo">
        <img src={logo} alt="Logo jpg" />
      </div>
      <nav className="Nav-header">
        <Link
          to="/"
          title="Home"
          className="a-header"
          onClick={() => {
            setproductfilter(productList);
          }}
        >
          <button>Inicio</button>
        </Link>
        <Link to="/contact">
          <button>Contactanos</button>
        </Link>

        {user ? (
          <>
            {user.rol === "vendedor" ? (
              <Link
                to="/order"
                title="Pedidos"
                onClick={() => {
                  setorderListFilter(orderList);
                }}
              >
                <button> Pedidos </button>
              </Link>
            ) : (
              <Link to={"/order"} title="Pedidos">
                <button> Mis Pedidos </button>
              </Link>
            )}
            {user.rol == "vendedor" && (
              <>
                <Link
                  to="/report"
                  title="Reportes"
                  onClick={() => {
                    setreportListFilter(reportList);
                  }}
                >
                  <button>Ver reportes</button>
                </Link>
                <Link to="/create" title="Crear Producto">
                  <button>Crear Producto</button>
                </Link>
                <Link
                  to="/users"
                  title="Usuarios"
                  onClick={() => {
                    setuserListFilter(userList);
                  }}
                >
                  <button> Ver usuarios</button>
                </Link>
              </>
            )}
            <Link
              to={`/profile/${user.username}/${user.password_hash}`}
              title="Perfil"
            >
              <button>Perfil </button>
            </Link>
          </>
        ) : (
          <Link to="/login" title="Iniciar Sesion">
            <button>Iniciar Sesion</button>
          </Link>
        )}
        <div>
          <Link to="/cart" title="Carrito de compras">
            <button>
              <FaShoppingCart />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
