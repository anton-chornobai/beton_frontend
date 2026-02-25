import React, { useEffect, useState } from "react";
import { Tile } from "../features/products/types/Tile";
import { ProductCard } from "./ProductCard";
import { Figure } from "../features/products/types/Figure";
import { Vase } from "../features/products/types/Vase";
import { AnyProduct, Product } from "../features/products/types/Product";

type Props = {
  products: Tile[] | Figure[] | Vase[] | Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [items, setItems] = useState<(Tile | Figure | Vase)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  if (products.length == 0 ) {
     return <div>No elements found</div>
  }

  return (
    <ul className="product-list">
        {products.map((product: AnyProduct ) => <ProductCard key={`${product.id}`}  product={product} />)}
    </ul>
  );
};

