import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { getProductByID } from "../../api/products";
import { Product } from "../../types/Product";
import placeholder from "../../../../images/placeholder.jpg";

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  useEffect(() => {
    async function GetSingleProductByID() {
      try {
        const res = await getProductByID("/v1/products", id);
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        const data = await res.json();

        if (data.data === null) {
          throw new Error("something went wrong");
        }
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    GetSingleProductByID();
  }, [id]);

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productTop}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>

        <div className={styles.productCard}>
          <img
            src={product.imageUrl || placeholder}
            alt={product.title}
            className={styles.productImage}
          />

          <div className={styles.productDetails}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <p>
              <strong>Price:</strong> {product.price} грн
            </p>
            <p>
              <strong>Type:</strong> {product.type}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            {product.size && (
              <p>
                <strong>Size:</strong> {product.size.width} ×{" "}
                {product.size.height} cm
              </p>
            )}
          </div>
        </div>
      </div>

      {product.description && (
        <div className={styles.productDescription}>
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
