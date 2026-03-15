export type Product = {
    id: number;
    title: string;
    product_type: string;
    price: number;
    stock_quantity: number;
    image_url?: string | null;
    color?: string | null;
    description?: string | null;
    status: "archived" | "displayed";
    weight_grams?: number | null;
    rating?: number | null;
    size_width?: number | null;
    size_height?: number | null;
  };
  
  export type ProductForm = Omit<Product, "id">;