import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function AdminGuard() {
  const { user } = useUser();
  if (!user || user.rol !== "vendedor") {
    const error = "No tenes acceso a esta ruta";
    return <Navigate to={`/error/${error}`} replace />;
  }
  return <Outlet />;
}
