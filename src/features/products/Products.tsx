import { ProductSection } from "./components/ProductSection";
import { ProductList } from "./components/ProductList";
import styles from "./Product.module.scss";
import { useEffect, useState } from "react";
import { AnyProduct } from "./types/Product";
import { getProducts } from "./api/products";

export const Products = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<AnyProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts("/v1/products");
        const data = await response.json();
        setItems(data?.data ?? []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!items || items.length === 0) {
    return <div>No elements found</div>;
  }
  const tiles = items.filter((item) => item.type === "tile");
  const fountains = items.filter((item) => item.type === "fountain");
  const vases = items.filter((item) => item.type === "vase");
  const figures = items.filter((item) => item.type === "figure");

  return (
    <div className={styles.products}>
      {tiles.length !== 0  && (
        <ProductSection title="Плитка">
          <ProductList products={tiles} />
        </ProductSection>
      )}
      {fountains.length !== 0  && (
        <ProductSection title="Фонтани">
          <ProductList products={fountains} />
        </ProductSection>
      )}
      {vases.length !== 0  && (
        <ProductSection title="Вази">
          <ProductList products={vases} />
        </ProductSection>
      )}
      {figures.length !== 0 && (
        <ProductSection title="Фігури">
          <ProductList products={figures} />
        </ProductSection>
      )}
    </div>
  );
};
