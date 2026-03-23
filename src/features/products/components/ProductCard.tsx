import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Product.module.scss";
import { Vase } from "../types/Vase";
import { Tile } from "../types/Tile";
import { Figure } from "../types/Figure";

type Props = {
  product: Tile | Vase | Figure;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <li className={styles.card}>
      <div className={styles.image}>
        <img src={product.image_url} alt={product.title} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.meta}>
          <span className={styles.tag}>Колір: {product.color}</span>

          {product.size && (
            <span className={styles.tag}>
              {product.size.width} × {product.size.height} cm
            </span>
          )}
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{product.price} грн</span>

          <button className={styles.button} onClick={handleClick}>
            Переглянути
          </button>
        </div>
      </div>
    </li>
  );
};
