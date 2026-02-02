import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import { useProductList } from "../../context/productListContext";
import { updateProduct } from "../../services/productService";
import toast from "react-hot-toast";
import "../../styles/product/cardProduct.css";
export default function CardProduct(props) {
  const { productList, setproductList } = useProductList();
  const { user } = useUser();
  const { productID, cartIN, addtocart } = props;
  const { id } = useParams();
  const [modified, setmodified] = useState(false);
  const [loading, setLoading] = useState(false);
  function onClickModified() {
    setmodified(!modified);
  }
  const [product, setProduct] = useState(() => {
    let initProduct;
    if (productID) {
      initProduct = productList.find((input) => input.id_product === productID);
    } else {
      initProduct = productList.find(
        (input) => input.id_product === parseInt(id),
      );
    }
    return initProduct;
  });
  async function modifiedProduct(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    try {
      const response = await updateProduct(
        product.id_product,
        formData,
        user.token,
      );
      const updatedProductFromBack =
        response.product || response.result || response;
      const newProductState = { ...product, ...updatedProductFromBack };
      setProduct(newProductState);
      const copylist = productList.map((p) => {
        if (p.id_product === product.id_product) {
          return newProductState;
        }
        return p;
      });
      setproductList(copylist);
      toast.success("Producto actualizado correctamente");
      setmodified(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar. Verifica tus permisos.");
    } finally {
      setLoading(false);
    }
  }
  function formProduct() {
    return (
      <div className="Card-modified-Content">
        <form onSubmit={modifiedProduct}>
          <div className="Product-Image">
            <img src={image} alt={name} />
          </div>
          <div className="Card-Name">
            <div className="Card-Input-Group">
              <label>Cambiar Imagen:</label>
              <input type="file" name="image" accept="image/*" />
            </div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              placeholder="Nombre"
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              name="description"
              defaultValue={description}
              placeholder="Descripción"
            />
          </div>
          <div>
            <label>Categoría:</label>
            <input
              type="text"
              name="category"
              defaultValue={category}
              placeholder="Categoría"
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              defaultValue={price}
              placeholder="Precio"
            />
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              defaultValue={stock}
              placeholder="Stock"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" onClick={onClickModified}>
            Cancelar
          </button>
        </form>
      </div>
    );
  }
  if (!product) {
    const error = "Producto no encontrado";
    return <Navigate to={`/error/${error}`} replace />;
  }

  const { image, name, description, category, price, stock } = product;

  const cardClassName = modified ? "Card-Product-Edit" : "Card-Product-View";

  return (
    <div className={cardClassName}>
      {modified == true ? (
        formProduct()
      ) : (
        <>
          <div className="Product-Image">
            <img src={image} alt={name} />
          </div>
          <div className="Product-Info-Container">
            <div className="Card-Name">
              <p>
                <b>{name}</b>
              </p>
            </div>
            <div className="Product-Description">
              <p>{description}</p>
            </div>
            <div className="Product-Details">
              <div>
                <p>Categoría: {category}</p>
              </div>
              <div>
                <p>Precio: {price}</p>
              </div>
              <div>
                <p>Stock: {stock}</p>
              </div>
            </div>

            {!cartIN && (
              <div className="Product-Actions">
                {user && (
                  <>
                    {user.rol == "vendedor" && (
                      <button onClick={onClickModified}>Modificar</button>
                    )}
                  </>
                )}

                <button onClick={() => addtocart(product)}>
                  Agregar al Carrito
                </button>
                <Link to={`/cart`}>
                  <button onClick={() => addtocart(product)}>
                    Comprar Ahora
                  </button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
