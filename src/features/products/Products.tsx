import React from "react";
import { ProductSection } from "../../shared/ProductSection";
import { ProductList } from "../../shared/ProductList";
import { mockTiles } from "../../model/mock/mockTileData";



export const Products = () => {
  return (
    <>
      <ProductSection title="Tiles">
        <ProductList products={mockTiles} />
      </ProductSection>
      <ProductSection title="Figures">
        <div className="d"></div>
      </ProductSection>
    </>
  );
};
