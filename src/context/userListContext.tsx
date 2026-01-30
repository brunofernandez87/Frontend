import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";
import { getAllUsers } from "../services/userService";
const userListContext = createContext(null);
export function UserListProvider({ children }) {
  const [userList, setuserList] = useState([]);
  const { user } = useUser();
  const [loadingUsers, setLoadingUsers] = useState(false);
  const fetchUsers = async () => {
    if (user?.token) {
      setLoadingUsers(true);
      try {
        const data = await getAllUsers(user.token);
        setuserList(data);
      } catch (error) {
        console.error("Error cargando usuarios en el contexto:", error);
      } finally {
        setLoadingUsers(false);
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [user]);
  return (
    <userListContext.Provider
      value={{ userList, setuserList, fetchUsers, loadingUsers }}
    >
      {children}
    </userListContext.Provider>
  );
}
export function useUserList() {
  const context = useContext(userListContext);
  if (!context) {
    throw new Error("userList debe ser usado dentro de un userListProvider");
  }
  return context;
}
