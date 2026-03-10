export type OrderStatus = "очікується" | "підтверджено" | "відправлено" | "доставлено" | "скасовано";
export type PaymentStatus = "неоплачено" | "оплачено" | "не вдалося" | "повернено";

export interface Size {
  height: number;
  width: number;
  thickness: number;
}

export interface OrderItem {
  id: string;
  title: string;
  type: string;
  color: string;
  material: string;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  size: Size;
}

export interface Order {
  id: number;
  total: number;
  user_id: string;
  order_name: string;
  items: OrderItem[];
  status: OrderStatus;
  payment_status: PaymentStatus;
  discount?: number;
  shipping_address?: string;
  shipping_city?: string;
  shipping_postal_code?: string;
  created_at: Date;
  updated_at: Date;
}