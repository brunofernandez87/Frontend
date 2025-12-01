import { createContext, useContext, useState } from "react";

const userContext = createContext(null);
export function UserProvider({ children }) {
  const [user, setuser] = useState(null);
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
