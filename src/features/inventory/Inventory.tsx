import React, { useEffect, useState } from "react";
import styles from "./Inventory.module.scss";
import AddProductModal from "./components/AddProductModal";
import FilterPanel from "./components/FilterPanel";
import { deleteProduct, getProducts, patchProduct, postProduct } from "./api/products";
import { Product } from "../products/types/Product";
import EditProductModal from "./components/EditProductModal";
import { data, useNavigate } from "react-router-dom";

// Inventory.tsx
export type ProductForm = Omit<Product, "id" | "size"> & {
  width?: number;
  height?: number;
  image_url?: string | File; 
};

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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

  const productTypeMap = new Map([
    ["vase", "ваза"],
    ["tile", "плитка"],
    ["fountain", "фонтан"],
    ["figure", "фігура"],
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = e.target;
  
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0];
  
      setForm({
        ...form,
        [name]: file,
      });
  
      return;
    }

    const { value } = e.target;
  
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.image_url);
    try {
      const res = await postProduct("/v1/products", form);

      if (res.status !== 200 && res.status !== 201) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to post product");
      }

      const data = await res.json();

      const newProduct: Product = {
        id: data.id || products.length + 1,
        ...form,
      };

      console.log(newProduct);

      setProducts((prev) => [...prev, newProduct]);
      setIsModalOpen(false);
      setForm(initialForm);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (updated: Product) => {
    try {
      const res = await patchProduct(`/v1/products/${updated.id}`, {
        title: updated.title,
        type: updated.type,
        price: updated.price,
        stock_quantity: updated.stock_quantity,
        image_url: updated.image_url,
        color: updated.color,
        description: updated.description,
        status: updated.status,
        weight: updated.weight,
        rating: updated.rating,
        width: updated.size?.width,
        height: updated.size?.height,
      });
  
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update product");
      }
  
      // update local state so table reflects changes immediately
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
  
      setEditProductModalOpen(false);
      navigate("/inventory");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProduct(`/v1/products/${id}`);

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.inventory}>
      <h2>Склад</h2>

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
            <th>Дія</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length ? (
            filteredProducts.map((p: Product) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{productTypeMap.get(p.type) ?? p.type}</td>
                <td>{p.price != null ? `${p.price} грн` : "-"}</td>
                <td>{p.stock_quantity != null ? p.stock_quantity : "-"}</td>
                <td>{p.status}</td>
                <td>{p.color || "-"}</td>
                <td>{p.size ? `${p.size.width} × ${p.size.height}` : "-"}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setEditProductModalOpen(true);
                      navigate(`/inventory/${p.id}`);
                    }}
                  >
                    Змінити
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                Немає продуктів
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

      <EditProductModal
        onDelete={() => handleDelete(editingProduct!.id)}
        onSave={handleSave}
        product={editingProduct}
        isOpen={editProductModalOpen}
        onClose={() => {
          setEditProductModalOpen(false);
          navigate("/inventory");
        }}
      />
    </div>
  );
};

export default Inventory;
