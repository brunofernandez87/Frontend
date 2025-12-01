import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductList } from "../../context/productListContext";
import { useUser } from "../../context/userContext";
import "../../styles/product/createProduct.css";

export default function CreateProduct() {
  const { productList, setproductList } = useProductList();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const visibility =
    name.trim() !== "" &&
    category.trim() !== "" &&
    price.trim() !== "" &&
    stock !== "";
  function createProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const image = URL.createObjectURL(formData.get("image"));
    const stock = formData.get("stock");
    const price = formData.get("price");
    const newProduct = {
      id_product: productList.length + 1,
      image: image,
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: parseFloat(price),
      stock: parseInt(stock),
    };
    const copylist = [...productList, newProduct];
    setproductList(copylist);
    alert("¡¡¡Producto Creado!!!");
    navigate("/");
  }
  return (
    <div className="create-product-container">
      <h3> Crear nuevo Producto</h3>
      <form onSubmit={createProduct}>
        <label htmlFor="image"> Imagen</label>
        <input type="file" name="image" accept="image/"></input>
        <label htmlFor="name">Nombre del producto</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        ></input>
        <label htmlFor="description"> Descripcion</label>
        <textarea name="description"></textarea>
        <label htmlFor="category">Categoria:</label>
        <input
          type="text"
          name="category"
          /* cambiar por un select de categorias */
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        ></input>
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        ></input>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          name="stock"
          value={stock}
          onChange={(e) => setstock(e.target.value)}
        ></input>
        <button type="submit" disabled={!visibility}>
          Crear
        </button>
      </form>
    </div>
  );
}
