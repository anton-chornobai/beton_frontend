import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "../Product.module.scss";
import { getProducts } from "../api/products";

type Props = {
  products: any[]
}

export const ProductList: React.FC<Props> = ({ products}) => {
  return (
    <ul className={styles.product_list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};