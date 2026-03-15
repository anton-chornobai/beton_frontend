import React, { useEffect, useState } from "react";
import styles from "./Inventory.module.scss";
import AddProductModal from "./components/AddProductModal";
import { getProducts, postProduct } from "./api/products";
import { Product, ProductForm } from "./types/product";

const Inventory = () => {
  useEffect(() => {
    async function GetProducts() {
      try {
        const res = await getProducts("/v1/products");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setProducts(data?.data || []);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    GetProducts();
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialForm: ProductForm = {
    title: "",
    product_type: "",
    price: 0,
    stock_quantity: 0,
    image_url: null,
    color: null,
    description: null,
    status: "archived",
    weight_grams: null,
    rating: null,
    size_width: null,
    size_height: null,
  };

  const [form, setForm] = useState<ProductForm>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        value === ""
          ? null
          : name.includes("price") ||
            name.includes("quantity") ||
            name.includes("size") ||
            name.includes("weight") ||
            name.includes("rating")
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await postProduct("/v1/products", form);

      if (res.status !== 200 && res.status !== 201) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Product posted successfully");
    } catch (error) {
      console.error(error);
      return;
    }

    const newProduct: Product = {
      id: products.length + 1,
      ...form,
    } as Product;

    setProducts([...products, newProduct]);
    setIsModalOpen(false);
    setForm(initialForm);
  };

  return (
    <div className={styles.inventory}>
      <h2>Inventory</h2>

      
      <table className={styles.products_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва</th>
            <th>Тип продукту</th>
            <th>Ціна</th>
            <th>Кількість на складі</th>
            <th>Статус</th>
            <th>Колір</th>
            <th>Розмір (Ш×В)</th>
          </tr>
        </thead>
        {products.length ? (
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.product_type}</td>
                <td>{p.price !== null ? `${p.price} грн` : "-"}</td>
                <td>{p.stock_quantity !== null ? p.stock_quantity : "-"}</td>
                <td>{p.status}</td>
                <td>{p.color || "-"}</td>
                <td>
                  {p.size_width !== null && p.size_height !== null
                    ? `${p.size_width} × ${p.size_height}`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div>No items</div>
        )}
      </table>

      <AddProductModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Inventory;
