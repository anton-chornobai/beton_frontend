import { ProductType } from "./enum/productType";
import { TileColor } from "./enum/tileColor";
import { Figure } from "./Figure";
import { Tile } from "./Tile";
import { Vase } from "./Vase";

interface Size {
  width: number;
  height: number;
}

export interface Product {
  id: number;
  price: number;
  title: string;
  type: ProductType | string;
  color?: TileColor | string;
  status: "displayed" | "archived" | string;
  image_url?: string;
  description?: string;
  stock_quantity?: number;
  weight?: number;
  rating?: number;
  size?: Size | null;
}

export type AnyProduct = Product | Figure | Tile | Vase;
