import { createContext, useContext, useState } from "react";
import userListMock from "../mock/userMock.json";
const userListContext = createContext(null);
export function UserListProvider({ children }) {
  const [userList, setuserList] = useState(userListMock);
  return (
    <userListContext.Provider value={{ userList, setuserList }}>
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
