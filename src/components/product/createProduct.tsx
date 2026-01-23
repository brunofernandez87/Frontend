import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import "../../styles/product/createProduct.css";
import toast from "react-hot-toast";
import { createProduct } from "../../services/productService";

export default function CreateProduct() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [loading, setLoading] = useState(false);
  const visibility =
    name.trim() !== "" &&
    category.trim() !== "" &&
    price.trim() !== "" &&
    stock !== "";
  async function NewProduct(event) {
    event.preventDefault();
    if (!user) {
      toast.error("Debes iniciar sesión para vender");
      return;
    }
    setLoading(true);
    const formData = new FormData(event.target);
    // const image = URL.createObjectURL(formData.get("image"));
    const stock = formData.get("stock");
    const price = formData.get("price");
    const newProduct = {
      image: "",
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: parseFloat(price),
      stock: parseInt(stock),
    };
    try {
      await createProduct(newProduct, user.token);
      toast.success("¡Producto Creado Exitosamente!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear producto");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="create-product-container">
      <h3> Crear nuevo Producto</h3>
      <form onSubmit={NewProduct}>
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
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        ></input>
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          step="0.01" // Permite decimales
          min="0"
          required
        ></input>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          name="stock"
          value={stock}
          onChange={(e) => setstock(e.target.value)}
        ></input>
        <button type="submit" disabled={!visibility || loading}>
          {loading ? "Creando..." : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}
