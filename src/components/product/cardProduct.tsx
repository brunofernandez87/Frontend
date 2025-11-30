import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import { useProductList } from "../../context/productListContext";
import "../../styles/product/cardProduct.css";
export default function CardProduct(props) {
  const { productList, setproductList } = useProductList();
  const { user } = useUser();
  const { productID, cartIN, addtocart } = props;
  const { id } = useParams();
  const [modified, setmodified] = useState(false);
  function onClickModified() {
    setmodified(!modified);
  }
  const [product, setProduct] = useState(() => {
    let initProduct;
    if (productID) {
      initProduct = productList.find((input) => input.id_product === productID);
    } else {
      initProduct = productList.find(
        (input) => input.id_product === parseInt(id)
      );
    }
    return initProduct;
  });
  function modifiedProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updateProduct = {
      ...product,
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: formData.get("price"),
      stock: formData.get("stock"),
    };
    setProduct(updateProduct);
    const copylist = productList.map((p) => {
      if (p.id_product === updateProduct.id_product) {
        return updateProduct;
      }
      return p;
    });
    setproductList(copylist);
    setmodified(!modified);
  }
  function formProduct() {
    return (
      <div className="Card-modified-Content">
        <form onSubmit={modifiedProduct}>
          <div className="Product-Image">
            <img src={image} alt={name} />
          </div>
          <div className="Card-Name">
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
          <button type="submit">Guardar</button>
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
