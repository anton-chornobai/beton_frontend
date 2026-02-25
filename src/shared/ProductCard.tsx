import React from "react";
import { Tile } from "../features/products/types/Tile";

import { Figure } from "../features/products/types/Figure";
import { Vase } from "../features/products/types/Vase";

type Props = {
  product: Tile | Vase | Figure;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const renderThickness = () => isTile(product) && (product.thickness && <p>Thickness: {product.thickness} mm</p>);

  return (
    <li className="card">
      <div className="card-header">
        <img src={product.imageUrl} alt={product.title} />
        <h3>{product.title}</h3>
      </div>

      <div className="card-body">
        <p>Price: ${product.price}</p>
        <p>Color: {product.color}</p>
        {product.size && (
          <p>
            Size: {product.size.width} × {product.size.height} cm
          </p>
        )}
        {renderThickness()}
      </div>

      <div className="card-footer">
        ID: {product.id}
      </div>
    </li>
  );
};

// Guard checking the incoming obejcts whether they have appropriate properties to render

function isTile(product: any): product is Tile {
  return (product as Tile).thickness !== undefined;
}