import React, { useState } from "react";
import styles from "./ProductPicker.module.scss";
import { AnyProduct } from "../types/Product";

type Props = {
  products: AnyProduct[];
  onSelect: (product: AnyProduct) => void;
  onClose: () => void;
};

const tabs = [
  { key: "tile", label: "Плитка" },
  { key: "fountain", label: "Фонтани" },
  { key: "vase", label: "Вази" },
  { key: "figure", label: "Фігури" },
];

const ProductPicker: React.FC<Props> = ({ products, onSelect, onClose }) => {
  const [activeTab, setActiveTab] = useState("tile");

  const filtered = products.filter((p) => p.type === activeTab);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className={styles.header}>
          <h3>Обрати товар</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={activeTab === t.key ? styles.active : ""}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className={styles.grid}>
          {filtered.length === 0 ? (
            <p>Немає товарів</p>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className={styles.card}
                onClick={() => onSelect(p)}
              >
                {p.image_url && <img src={p.image_url} alt={p.title} />}
                <p>{p.title}</p>
                <span>{p.price} грн</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;