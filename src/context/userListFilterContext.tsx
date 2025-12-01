import { createContext, useContext, useState } from "react";
import { useUserList } from "./userListContext";
const userListFilterContext = createContext(null);
export function UserListFilterProvider({ children }) {
  const { userList } = useUserList();
  const [userListFilter, setuserListFilter] = useState(userList);
  return (
    <userListFilterContext.Provider
      value={{ userListFilter, setuserListFilter }}
    >
      {children}
    </userListFilterContext.Provider>
  );
}
export function useUserListFilter() {
  const context = useContext(userListFilterContext);
  if (!context) {
    throw new Error(
      "userListFilter debe ser usado dentro de un userListProvider"
    );
  }
  return context;
}
