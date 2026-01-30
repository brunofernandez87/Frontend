import { useState, useEffect } from "react";
import { useUserList } from "../../context/userListContext";
import { useUserListFilter } from "../../context/userListFilterContext";
import SearchCategory from "../product/searchCategory";
import FilterCategory from "../filterCategory";
import { deleteUserId, updateUser } from "../../services/userService";
import { useUser } from "../../context/userContext";
import "../../styles/user/users.css";
import toast from "react-hot-toast";

export default function Users() {
  const { userList, setuserList, loadingUsers, fetchUsers } = useUserList();
  const { userListFilter, setuserListFilter } = useUserListFilter();
  const { user } = useUser();
  const [page, setpage] = useState(1);
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
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?"))
      return;
    try {
      await deleteUserId(idToDelete, user.token);
      const newList = userList.filter((u) => u.id_user !== idToDelete);
      setuserList(newList);
      setuserListFilter(newList);
      toast.success("Usuario eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar usuario. Revisa que seas Admin.");
    }
  }

  const handleModifyRole = async (idUser, newRole) => {
    try {
      await updateUser(idUser, { rol: newRole }, user.token);
      const updateLists = (list) =>
        list.map((u) => (u.id_user === idUser ? { ...u, rol: newRole } : u));
      setuserList((prev) => updateLists(prev));
      setuserListFilter((prev) => updateLists(prev));
      toast.success(`Rol actualizado a: ${newRole}`);
      setEditUserId(null);
    } catch (error) {
      toast.error("Error al actualizar el rol");
    }
  };
  useEffect(() => {
    setuserListFilter(userList);
  }, [userList, setuserListFilter]);
  const users = userListFilter.slice(limitant, limit);

  function filterUser(event) {
    const value = event.target.value;
    if (value === "") {
      setuserListFilter(userList);
    } else {
      setuserListFilter(userList.filter((u) => u.rol === value));
    }
    setpage(1);
  }

  if (loadingUsers)
    return (
      <div className="users-page-container">
        <h2>Cargando usuarios...</h2>
      </div>
    );

  return (
    <div className="users-page-container">
      <div className="filters-wrapper">
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
          label="Filtrar por Rol"
        />
      </div>

      <div className="user-card-wrapper">
        {users.map((u) => {
          const isEditing = editUserId === u.id_user;
          return (
            <div key={u.id_user} className="user-card">
              <div className="user-details-content">
                <div className="card-header">
                  <span className="role-badge">Rol: {u.rol}</span>
                </div>

                <div className="card-body">
                  <img src={u.image} alt="Profile" className="user-avatar" />
                  <div className="user-text-info">
                    <p className="user-name">{u.name}</p>
                    <p className="user-username">@{u.username}</p>
                    <p className="user-email">{u.email}</p>
                  </div>
                </div>
              </div>

              <div className="admin-actions-container">
                {isEditing ? (
                  <div className="admin-edit-wrapper">
                    <select
                      value={u.rol}
                      onChange={(e) =>
                        handleModifyRole(u.id_user, e.target.value)
                      }
                      className="status-select-edit"
                      autoFocus
                    >
                      <option value="cliente">Cliente</option>
                      <option value="vendedor">Vendedor</option>
                    </select>
                    <button
                      className="cancel-modify-btn"
                      onClick={() => setEditUserId(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    {u.id_user !== user.id_user && (
                      <button
                        className="modify-state-btn"
                        onClick={() => setEditUserId(u.id_user)}
                      >
                        Cambiar Rol
                      </button>
                    )}

                    {u.rol === "cliente" && (
                      <button
                        className="cancel-order-btn"
                        onClick={() => handleDeleteUser(u.id_user)}
                      >
                        Eliminar Usuario
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pagination-container">
        {page > 1 && (
          <button className="Next-Page" onClick={handleClickPrevious}>
            Página anterior
          </button>
        )}
        {limit < userListFilter.length && (
          <button className="Previous-Page" onClick={handleClickNext}>
            Página siguiente
          </button>
        )}
      </div>
    </div>
  );
}
