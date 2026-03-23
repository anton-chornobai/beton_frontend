import React, { useState } from "react";
import styles from "./ProductPicker.module.scss";
import { Product } from "../../products/types/Product";
import img from "../../../images/placeholder.jpg"

type Props = {
  products: Product[];
  onSelect: (product: Product) => void;
  onClose: () => void;
};

const ProductPicker: React.FC<Props> = ({ products, onSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(products.map((p) => p.type || "Інше"))
  );

  const filteredProducts = activeCategory
    ? products.filter((p) => (p.type || "Інше") === activeCategory)
    : products;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.header}>
          <h3>Оберіть продукт</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className={styles.grid}>
          {filteredProducts.length === 0 ? (
            <p>Немає продуктів</p>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className={styles.card}
                onClick={() => onSelect(p)}
              >
                {p.image_url  ? (
                  <img className={styles.product_image} src={img} alt={p.title} />
                ) : (
                  <img className={styles.product_image} src={img} alt={p.title} />
                )}
                <div className={styles.info}>
                  <p className={styles.name}>{p.title}</p>
                  <p className={styles.price}>{p.price} грн</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.categories}>
          <button
            className={!activeCategory ? styles.active : ""}
            onClick={() => setActiveCategory(null)}
          >
            Всі
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? styles.active : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductPicker;