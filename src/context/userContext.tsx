import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext(null);
export function UserProvider({ children }) {
  const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem("sistema_ventas_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("sistema_ventas_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sistema_ventas_user");
    }
  }, [user]);
  return (
    <userContext.Provider value={{ user, setuser }}>
      {children}
    </userContext.Provider>
  );
}
export function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
}
