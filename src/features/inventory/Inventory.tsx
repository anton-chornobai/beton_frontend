import React, { useState } from "react";
import styles from "./Inventory.module.scss";

type Product = {
  id: number;
  title: string;
  product_type: string;
  price: number;
  stock_quantity: number;
  color?: string;
  size_width?: number;
  size_height?: number;
};

type ProductForm = Omit<Product, "id">;

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Ergonomic Office Chair",
      product_type: "furniture",
      price: 2999,
      stock_quantity: 15,
      color: "black",
      size_width: 60,
      size_height: 120,
    },
    {
      id: 2,
      title: "Wooden Desk",
      product_type: "furniture",
      price: 2000,
      stock_quantity: 10,
      color: "oak",
      size_width: 140,
      size_height: 75,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    product_type: "",
    price: 0,
    stock_quantity: 0,
    color: "",
    size_width: 0,
    size_height: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name.includes("price") || name.includes("quantity") || name.includes("size") ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: products.length + 1,
      ...form,
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
    setForm({ title: "", product_type: "", price: 0, stock_quantity: 0, color: "", size_width: 0, size_height: 0 });
  };

  return (
    <div className={styles.inventory}>
      <h2>Inventory</h2>

      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
        + Add New Product
      </button>

      <table className={styles.products_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Color</th>
            <th>Size (W×H)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.product_type}</td>
              <td>${p.price}</td>
              <td>{p.stock_quantity}</td>
              <td>{p.color}</td>
              <td>
                {p.size_width} × {p.size_height}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
              <input name="product_type" placeholder="Type" value={form.product_type} onChange={handleChange} required />
              <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
              <input name="stock_quantity" type="number" placeholder="Stock Quantity" value={form.stock_quantity} onChange={handleChange} required />
              <input name="color" placeholder="Color" value={form.color} onChange={handleChange} />
              <input name="size_width" type="number" placeholder="Width" value={form.size_width} onChange={handleChange} />
              <input name="size_height" type="number" placeholder="Height" value={form.size_height} onChange={handleChange} />
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;