import { ProductType } from "./enum/productType"
import { TileColor } from "./enum/tileColor";
import { Figure } from "./Figure";
import { Tile } from "./Tile";
import { Vase } from "./Vase";

interface Size {
    width?: number;
    height?: number;
  }
  
  export interface Product {
    id: number;
    price: number;
    title: string;
    type: string;
    color: string;
    status: string;
    imageUrl?: string;
    description?: string;
    stockQuantity?: number;
    weight?: number;
    rating?: number;
    size?: Size | null;
  }

export type AnyProduct = Product | Figure | Tile | Vase
