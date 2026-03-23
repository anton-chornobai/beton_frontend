import React from "react";
import styles from "../Inventory.module.scss";
import { ProductForm } from "../Inventory";

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
            <select name="type" value={form.type} onChange={onChange} required>
              <option value="">Оберіть тип</option>
              <option value="tile">Плитка</option>
              <option value="vase">Ваза</option>
              <option value="figure">Фігура</option>
              <option value="fountain">Фонтан</option>
            </select>
          </label>

          {/* Price */}
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

          {/* Stock Quantity */}
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

          {/* Image URL */}
          <label>
            URL зображення
            <input
              name="image_url"
              type="text"
              value={form.image_url || ""}
              onChange={onChange}
            />
          </label>

          {/* Color */}
          <label>
            Колір
            <input
              name="color"
              type="text"
              value={form.color || ""}
              onChange={onChange}
            />
          </label>

          {/* Description */}
          <label>
            Опис
            <textarea
              name="description"
              value={form.description || ""}
              onChange={onChange}
            />
          </label>

          {/* Status */}
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

          {/* Weight */}
          <label>
            Вага (грам)
            <input
              name="weight"
              type="number"
              min={0}
              step={1}
              value={form.weight ?? 0}
              onChange={onChange}
            />
          </label>

          {/* Size Width */}
          <label>
            Ширина (см)
            <input
              name="width"
              type="number"
              min={0}
              step={1}
              value={form?.width ?? 0}
              onChange={onChange}
            />
          </label>

          {/* Size Height */}
          <label>
            Висота (см)
            <input
              name="height"
              type="number"
              min={0}
              step={1}
              value={form?.height ?? 0}
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
