import React, { useEffect, useState } from "react";
import styles from "./Inventory.module.scss";
import AddProductModal from "./components/AddProductModal";
import FilterPanel from "./components/FilterPanel";
import { getProducts, postProduct } from "./api/products";
import { Product } from "../products/types/Product";

export type ProductForm = Omit<Product, "id" | "size"> & {
  width?: number;
  height?: number;
};

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<{
    status?: string;
    sortPrice?: "asc" | "desc";
  }>({});
  const [search, setSearch] = useState("");

  const initialForm: ProductForm = {
    title: "",
    type: "",
    price: 0,
    stock_quantity: 0,
    image_url: "",
    color: "",
    description: "",
    status: "archived",
    weight: 0,
    rating: 0,
    width: 0,
    height: 0,
  };

  const [form, setForm] = useState<ProductForm>(initialForm);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getProducts("/v1/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data?.data || []);
        setFilteredProducts(data?.data || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (filter.status) temp = temp.filter((p) => p.status === filter.status);

    if (search.trim() !== "") {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter.sortPrice) {
      temp.sort((a, b) =>
        filter.sortPrice === "asc"
          ? (a.price || 0) - (b.price || 0)
          : (b.price || 0) - (a.price || 0)
      );
    }

    setFilteredProducts(temp);
  }, [filter, search, products]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: [
        "price",
        "stock_quantity",
        "weight",
        "rating",
        "width",
        "height",
      ].includes(name)
        ? Number(value)
        : value || "",
    });
  };

  // Submit new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await postProduct("/v1/products", form);
      if (res.status !== 200 && res.status !== 201) {
        const data = await res.json();
        throw new Error(data.message || "Failed to post product");
      }
    } catch (error) {
      console.error(error);
      return;
    }

    const newProduct: Product = {
      id: products.length + 1,
      ...form,
    };

    setProducts([...products, newProduct]);
    setIsModalOpen(false);
    setForm(initialForm);
  };

  return (
    <div className={styles.inventory}>
      <h2>Inventory</h2>

      <FilterPanel
        setFilter={setFilter}
        setSearch={setSearch}
        search={search}
        setIsModalOpen={setIsModalOpen}
      />

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
        <tbody>
          {filteredProducts.length ? (
            filteredProducts.map((p: Product) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.type}</td>
                <td>{p.price != null ? `${p.price} грн` : "-"}</td>
                <td>{p.stock_quantity != null ? p.stock_quantity : "-"}</td>
                <td>{p.status}</td>
                <td>{p.color || "-"}</td>
                <td>{p.size ? `${p.size.width} × ${p.size.height}` : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No items
              </td>
            </tr>
          )}
        </tbody>
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
