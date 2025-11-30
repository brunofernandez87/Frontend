import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/user/login";
import Register from "./components/user/register";
import Profile from "./components/user/profile";
import ChangePassword from "./components/user/changePassword";
import Recovery from "./components/user/recovery";
import Cart from "./components/cart";
import CardProduct from "./components/product/cardProduct";
import Report from "./components/report/report";
import Error from "./components/errorPage";
import CreateProduct from "./components/product/createProduct";
import AboutUS from "./components/aboutUs";
import Contact from "./components/contact";
import OrderDetail from "./components/order/orderDetail";
import Order from "./components/order/order";
import { Toaster, toast } from "react-hot-toast";
import { useCart } from "./context/cartContext";
import AdminGuard from "./components/adminGuard";
import ModificateUser from "./components/user/modificateUser";
import Users from "./components/user/users";
export default function Routs() {
  const { addOrUpdateItem } = useCart(); /* pasar a cardProduct */
  function handleAddToCart(product) {
    if (product) {
      addOrUpdateItem(product);
      toast.success("Producto agregado al carrito", { icon: "🛒" });
    }
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:usernam/:password" element={<Profile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/product/:id"
          element={<CardProduct addtocart={handleAddToCart} />}
        />
        <Route path="/order" element={<Order />} />
        <Route path="/orderDetail/:id" element={<OrderDetail />} />
        <Route path="/error/:error" element={<Error />} />
        <Route path="/aboutUs" element={<AboutUS />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/modificateUser" element={<ModificateUser />} />
        <Route element={<AdminGuard />} /*Rutas protegidas */>
          <Route path="/report" element={<Report />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
