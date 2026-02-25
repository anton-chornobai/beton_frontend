import { ProductType } from "./enum/productType"
import { TileColor } from "./enum/tileColor";
import { Figure } from "./Figure";
import { Tile } from "./Tile";
import { Vase } from "./Vase";

export interface Product {
    id: number,
    title: string,
    price: number,
    type: ProductType,
    imageUrl: string,
    color: TileColor,
    stockQuantity?: number,
    description?: string,
    weight?: number,
    rating?: number,
    size?: {
        width: number,
        height: number,
    },
}

export type AnyProduct = Product | Figure | Tile | Vase
