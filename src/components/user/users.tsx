import { useState, useEffect } from "react";
import { useUserList } from "../../context/userListContext";
import { useUserListFilter } from "../../context/userListFilterContext";
import SearchCategory from "../product/searchCategory";
import FilterCategory from "../filterCategory";
import {
  getAllUsers,
  deleteUserId,
  updateUser,
} from "../../services/userService";
import { useUser } from "../../context/userContext";
import "../../styles/user/users.css";
import toast from "react-hot-toast";

export default function Users() {
  const { userList, setuserList } = useUserList();
  const { userListFilter, setuserListFilter } = useUserListFilter();
  const { user } = useUser();
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const maxUsers = 5;
  const limit = page * maxUsers;
  const limitant = limit - maxUsers;
  function handleClickNext() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page + 1);
  }
  function handleClickPrevious() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page - 1);
  }
  async function handleDeleteUser(idToDelete) {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este usuario?")
    ) {
      return;
    }
    try {
      await deleteUserId(idToDelete, user.token);
      const newList = userList.filter((u) => u.id_user !== idToDelete);
      setuserList(newList);
      setuserListFilter(newList);
      toast.success("Usuario eliminado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar usuario. Revisa que seas Admin.");
    }
  }
  const handleModifyRole = async (idUser, newRole) => {
    try {
      await updateUser(idUser, { rol: newRole }, user.token);
      const updateLists = (list) =>
        list.map((u) => {
          if (u.id_user === idUser) {
            return { ...u, rol: newRole };
          }
          return u;
        });
      setuserList((prev) => updateLists(prev));
      setuserListFilter((prev) => updateLists(prev));

      toast.success(`Rol actualizado a: ${newRole}`);
      setEditUserId(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el rol");
    }
  };
  useEffect(() => {
    async function fetchUsers() {
      if (user?.token) {
        try {
          const data = await getAllUsers(user.token);
          setuserList(data);
          setuserListFilter(data);
        } catch (error) {
          console.error(error);
          toast.error("Error al cargar usuarios");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUsers();
  }, [user, setuserList, setuserListFilter]);
  const users = userListFilter.slice(limitant, limit);
  function filterUser(event) {
    const value = event.target.value;
    if (value == "") {
      setuserListFilter(userList);
      setpage(1);
      return;
    }
    const result = userList.filter((u) => u.rol == value);
    setpage(1);
    setuserListFilter(result);
  }
  if (loading)
    return (
      <div className="user-list-page">
        <h2>Cargando usuarios...</h2>
      </div>
    );
  return (
    <div className="user-list-page">
      <SearchCategory
        productFilt={userList}
        setproductfilter={setuserListFilter}
        category="name"
        label="Buscar Usuario"
      />
      <FilterCategory
        products={userList}
        category="rol"
        filter={filterUser}
        label="ordenar por"
      />
      <div className="user-card-wrapper">
        {users.map((u) => {
          const isEditing = editUserId === u.id_user;
          return (
            <div key={u.id_user} className="user-card-item">
              <div className="Image-Profile">
                <img src={u.image} alt="Profile.png" />
              </div>
              <div className="user-info-group">
                <div className="user-name-username">
                  <p>
                    Nombre: <strong>{u.name}</strong>
                  </p>
                  <p>
                    Username: <strong>{u.username}</strong>
                  </p>
                </div>
                <div className="Email-Profile">
                  <p>
                    Email: <strong>{u.email}</strong>
                  </p>
                </div>
              </div>
              <div
                className="user-role"
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                {isEditing ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <select
                      value={u.rol}
                      onChange={(e) =>
                        handleModifyRole(u.id_user, e.target.value)
                      }
                      autoFocus
                    >
                      <option value="cliente">Cliente</option>
                      <option value="vendedor">Vendedor</option>
                    </select>
                    <button onClick={() => setEditUserId(null)}>✖</button>
                  </div>
                ) : (
                  <>
                    <p>
                      Rol: <strong>{u.rol}</strong>
                    </p>
                    {u.id_user !== user.id_user && (
                      <button onClick={() => setEditUserId(u.id_user)}>
                        Cambiar Rol
                      </button>
                    )}
                  </>
                )}
              </div>
              {u.rol === "cliente" && !isEditing && (
                <button onClick={() => handleDeleteUser(u.id_user)}>X</button>
              )}
            </div>
          );
        })}
      </div>
      <div className="pagination-container">
        {page > 1 && (
          <button className="Next-Page" onClick={handleClickPrevious}>
            Pagina anterior
          </button>
        )}
        {limit < userListFilter.length && (
          <button className="Previous-Page" onClick={handleClickNext}>
            Pagina siguiente
          </button>
        )}
      </div>
    </div>
  );
}
