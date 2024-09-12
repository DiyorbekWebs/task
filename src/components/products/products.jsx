import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductTitle, setEditingProductTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addProduct = () => {
    if (newProduct.trim() === "") {
      setError("Product name cannot be empty");
      return;
    }

    axios
      .post("https://dummyjson.com/products/add", {
        title: newProduct,
      })
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct("");
        setError("");
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`https://dummyjson.com/products/${id}`)
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  const editProduct = (product) => {
    setEditingProductId(product.id);
    setEditingProductTitle(product.title);
  };

  const saveProduct = (id) => {
    axios
      .put(`https://dummyjson.com/products/${id}`, {
        title: editingProductTitle,
      })
      .then((response) => {
        setProducts(
          products.map((product) =>
            product.id === id ? { ...product, title: response.data.title } : product
          )
        );
        setEditingProductId(null);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="New Product"
          className="border p-2"
        />
        <button
          onClick={addProduct}
          className="ml-2 bg-blue-500 text-white p-2"
        >
          Add Product
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center mb-2">
            {editingProductId === product.id ? (
              <input
                type="text"
                value={editingProductTitle}
                onChange={(e) => setEditingProductTitle(e.target.value)}
                className="border p-2 flex-grow"
              />
            ) : (
              <span>{product.title}</span>
            )}
            <div>
              {editingProductId === product.id ? (
                <button
                  onClick={() => saveProduct(product.id)}
                  className="ml-2 bg-green-500 text-white p-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => editProduct(product)}
                  className="ml-2 bg-yellow-500 text-white p-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteProduct(product.id)}
                className="ml-2 bg-red-500 text-white p-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
