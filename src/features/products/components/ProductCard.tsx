import React from "react";
import { Tile } from "../types/Tile";

import { Figure } from "../types/Figure";
import { Vase } from "../types/Vase";

type Props = {
  product: Tile | Vase | Figure;
};

export const ProductCard: React.FC<Props> = ({ product }) => {

  return (
    <li className="card">
      <div className="card-header">
        <img src={product.imageUrl} alt={product.title} />
        <h3>{product.title}</h3>
      </div>

      <div className="card-body">
        <p>Ціна: {product.price} грн</p>
        <p>Колір: {product.color}</p>
        {product.size && (
          <p>
            Розмір: {product.size.width} × {product.size.height} cm
          </p>
        )}
      </div>
    </li>
  );
};

// Guard checking the incoming obejcts whether they have appropriate properties to render

function isTile(product: any): product is Tile {
  return (product as Tile).thickness !== undefined;
}