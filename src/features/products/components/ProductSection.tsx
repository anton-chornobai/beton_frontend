import React, { ReactElement } from "react";
import styles from "../Product.module.scss"
import { ProductList } from "./ProductList";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const ProductSection: React.FC<Props> = ({ title, children }) => {
  return (
    <section className={styles.productSection}>
      <h2>{title}</h2>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
};
