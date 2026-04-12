import React, { useEffect } from "react";
import styles from "../Inventory.module.scss";
import { Product } from "../../products/types/Product";
import AreYouSure from "../../../shared/modals/AreYouSure";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updated: Product) => void;
  onDelete: (id: number) => void;
};

type EditForm = {
  title: string;
  type: string;
  price: number;
  stock_quantity: number;
  image_url: string | File;
  color: string;
  description: string;
  status: string;
  weight: number;
  rating: number;
  width: number;
  height: number;
};

const EditProductModal: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
  onSave,
  onDelete,
}) => {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [form, setForm] = React.useState<EditForm | null>(null);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        type: product.type,
        price: product.price,
        stock_quantity: product.stock_quantity ?? 0,
        image_url: product.image_url || "",
        color: product.color || "",
        description: product.description || "",
        status: product.status,
        weight: product.weight ?? 0,
        rating: product.rating ?? 0,
        width: product.size?.width ?? 0,
        height: product.size?.height ?? 0,
      });
    }
  }, [product]);

  if (!isOpen || !product || !form) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0];
      setForm((prev) => prev ? { ...prev, [name]: file } : prev);
      return;
    }

    const { value } = e.target;
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: ["price", "stock_quantity", "weight", "rating", "width", "height"].includes(name)
              ? Number(value)
              : value,
          }
        : prev
    );
  };

  const handleSave = () => {
    if (!form) return;

    const updated: Product = {
      ...product,
      title: form.title,
      type: form.type,
      price: form.price,
      stock_quantity: form.stock_quantity,
      image_url: typeof form.image_url === "string" ? form.image_url : product.image_url,
      color: form.color,
      description: form.description,
      status: form.status as Product["status"],
      weight: form.weight,
      rating: form.rating,
      size: { width: form.width, height: form.height },
    };

    onSave(updated);
    onClose();
  };

  const handleConfirmDelete = () => {
    onDelete(product.id);
    setShowConfirm(false);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Редагувати продукт</h2>

        <div className={styles.form}>
          <label>
            Назва
            <input name="title" value={form.title} onChange={handleChange} />
          </label>

          <label>
            Тип продукту
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">Оберіть тип</option>
              <option value="tile">Плитка</option>
              <option value="vase">Ваза</option>
              <option value="figure">Фігура</option>
              <option value="fountain">Фонтан</option>
            </select>
          </label>

          <label>
            Ціна
            <input name="price" type="number" value={form.price} onChange={handleChange} />
          </label>

          <label>
            Кількість на складі
            <input name="stock_quantity" type="number" value={form.stock_quantity} onChange={handleChange} />
          </label>

          <label>
            Зображення
            <input name="image_url" type="file" accept="image/*" onChange={handleChange} />
            {typeof form.image_url === "string" && form.image_url && (
              <img src={form.image_url} alt="current" style={{ width: 80, marginTop: 6 }} />
            )}
          </label>

          <label>
            Колір
            <input name="color" value={form.color} onChange={handleChange} />
          </label>

          <label>
            Опис
            <textarea name="description" value={form.description} onChange={handleChange} />
          </label>

          <label>
            Статус
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="archived">Архівований</option>
              <option value="displayed">Відображений</option>
            </select>
          </label>

          <label>
            Вага (грам)
            <input name="weight" type="number" value={form.weight} onChange={handleChange} />
          </label>

          <label>
            Ширина (см)
            <input name="width" type="number" value={form.width} onChange={handleChange} />
          </label>

          <label>
            Висота (см)
            <input name="height" type="number" value={form.height} onChange={handleChange} />
          </label>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <button className={styles.submitButton} onClick={handleSave}>
              Зберегти
            </button>
            <button
              className={styles.deleteButton}
              style={{ marginTop: "10px", padding: "12px", background: "red" }}
              onClick={() => setShowConfirm(true)}
            >
              Видалити продукт
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <AreYouSure
          text={`Ви впевнені, що хочете видалити "${product.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default EditProductModal;