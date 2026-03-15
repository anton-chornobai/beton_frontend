import React from "react";
import styles from "../Inventory.module.scss";
import { ProductForm } from "../types/product";

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  form: ProductForm;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const AddProductModal: React.FC<Props> = ({
  isModalOpen,
  onClose,
  form,
  onChange,
  onSubmit,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2>Додати новий продукт</h2>

        <form onSubmit={onSubmit} className={styles.form}>
          <label>
            Назва
            <input
              name="title"
              maxLength={50}
              value={form.title}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Тип продукту
            <select
              name="product_type"
              value={form.product_type}
              onChange={onChange}
              required
            >
              <option value="">Оберіть тип</option>
              <option value="tile">плитка</option>
              <option value="vase">ваза</option>
              <option value="figure">фігура</option>
              <option value="fountain">фонтан</option>
            </select>
          </label>
          <label>
            Ціна
            <input
              name="price"
              type="number"
              min={0}
              step={1}
              value={form.price}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Кількість на складі
            <input
              name="stock_quantity"
              type="number"
              min={0}
              step={1}
              value={form.stock_quantity}
              onChange={onChange}
              required
            />
          </label>

          <label>
            URL зображення
            <input
              name="image_url"
              type="text"
              value={form.image_url || ""}
              onChange={onChange}
            />
          </label>

          <label>
            Колір
            <input name="color" value={form.color || ""} onChange={onChange} />
          </label>

          <label>
            Опис
            <textarea
              name="description"
              value={form.description || ""}
              onChange={onChange}
            />
          </label>

          <label>
            Статус
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              required
            >
              <option value="archived">Архівований</option>
              <option value="displayed">Відображений</option>
            </select>
          </label>

          <label>
            Вага (грам)
            <input
              name="weight_grams"
              type="number"
              min={0}
              step={1}
              value={form.weight_grams ?? ""}
              onChange={onChange}
            />
          </label>

          <label>
            Ширина (см)
            <input
              name="size_width"
              type="number"
              min={0}
              step={1}
              value={form.size_width ?? ""}
              onChange={onChange}
            />
          </label>

          <label>
            Висота (см)
            <input
              name="size_height"
              type="number"
              min={0}
              step={1}
              value={form.size_height ?? ""}
              onChange={onChange}
            />
          </label>

          <button type="submit">Додати продукт</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
