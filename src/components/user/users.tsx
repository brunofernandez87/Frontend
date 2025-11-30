import { useState } from "react";
import { useUserList } from "../../context/userListContext";
import { useUserListFilter } from "../../context/userListFilterContext";
import SearchCategory from "../product/searchCategory";
import FilterCategory from "../filterCategory";
import "../../styles/user/users.css";

export default function Users() {
  const { userList, setuserList } = useUserList();
  const { userListFilter, setuserListFilter } = useUserListFilter();
  const [page, setpage] = useState(1);
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
        {users.map((u) => (
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
            <div className="user-role">
              <p>
                Rol: <strong>{u.rol}</strong>
              </p>
            </div>
            {u.rol === "cliente" && (
              <button
                onClick={() => {
                  setuserList((prevList) =>
                    prevList.filter((user) => user.id_user !== u.id_user)
                  );
                  setuserListFilter((prevFilter) =>
                    prevFilter.filter((user) => user.id_user !== u.id_user)
                  );
                }}
              >
                X
              </button>
            )}
          </div>
        ))}
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
