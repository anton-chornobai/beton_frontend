import { ProductSection } from "./components/ProductSection";
import { ProductList } from "./components/ProductList";
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
