import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../../styles/product/cardsproducts.css";
import FilterCategory from "../filterCategory";
import SelectProduct from "./selectProduct";
import SearchCategory from "./searchCategory";
import { useUser } from "../../context/userContext";
import { useProductList } from "../../context/productListContext";
import { useProductFilter } from "../../context/productFilterContext";
import { deleteProduct } from "../../services/productService";
import toast from "react-hot-toast";
export default function CardProducts() {
  const { productList, setproductList, loading } = useProductList();
  const [page, setpage] = useState(1);
  const productFilt = useMemo(() => {
    const safeList = productList || [];
    return safeList.filter((p) => p.stock > 0);
  }, [productList]);
  const { productfilter, setproductfilter } = useProductFilter();
  useEffect(() => {
    setproductfilter(productList);
  }, [productList, setproductfilter]);
  const { user } = useUser();
  const maxProduct = 5;
  const limite = page * maxProduct;
  const limiteant = limite - maxProduct;
  const products = productfilter.slice(limiteant, limite);
  function handleClickNext() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page + 1);
  }
  function handleClickPrevious() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpage(page - 1);
  }
  function categoryFilter(event) {
    const value = event.target.value;
    if (value == "") {
      setproductfilter(productFilt);
      setpage(1);
      return;
    }
    const result = productFilt.filter((p) => {
      return p.category === value;
    });
    setpage(1);
    setproductfilter(result);
  }
  const handleDeleteProduct = async (idToDelete) => {
    if (
      !window.confirm(
        "¿Estás seguro de que deseas eliminar este producto permanentemente?",
      )
    ) {
      return;
    }
    try {
      await deleteProduct(idToDelete, user.token);
      const newList = productList.filter((p) => p.id_product !== idToDelete);
      setproductList(newList);
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar. Verifica que seas vendedor.");
    }
  };
  return (
    <>
      <SearchCategory
        productFilt={productFilt}
        setproductfilter={setproductfilter}
        category="name"
        label="Buscar Producto"
      />
      <FilterCategory
        products={productFilt}
        category="category"
        filter={categoryFilter}
        label={"ordenar por"}
      />
      <SelectProduct
        productfilter={productfilter}
        setpage={setpage}
        setproductfilter={setproductfilter}
      />
      {loading ? (
        <p> Cargando... </p>
      ) : (
        <>
          {products.map((product) => (
            <div key={product.id_product} className="Card-Products">
              <Link
                to={`/product/${product.id_product}`}
                className="link-Products"
              >
                <div className="Card-Images">
                  <img
                    src={
                      product.image
                        ? `${product.image}?v=${product.updatedAt || new Date().getTime()}`
                        : "https://via.placeholder.com/150?text=Sin+Imagen"
                    }
                    alt={product.name}
                    className="Image-product"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/150?text=Sin+Imagen";
                    }}
                  />
                </div>
                <div className="Card-Names">
                  <p>
                    <b>{product.name}</b>
                  </p>
                </div>
                <div className="Card-Descriptions">{product.description}</div>
                <div className="Card-Categories">{product.category}</div>
                <div className="Card-Prices">
                  <p>
                    <b>Precio: ${product.price}</b>
                  </p>
                </div>
              </Link>
              {user != null && (
                <>
                  {user.rol == "vendedor" && (
                    /* al ser admin podes eliminar */ <button
                      className="Delete-Button"
                      onClick={() => handleDeleteProduct(product.id_product)}
                    >
                      X
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
          <div>
            {page > 1 && (
              <button className="Next-Page" onClick={handleClickPrevious}>
                Pagina anterior
              </button>
            )}
            {limite < productfilter.length && (
              <button className="Previous-Page" onClick={handleClickNext}>
                Pagina siguiente
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
