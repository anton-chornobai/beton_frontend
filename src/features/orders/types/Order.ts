export type OrderStatus = "pending" | "підтверджено" | "відправлено" | "доставлено" | "скасовано";
export type PaymentStatus = "неоплачено" | "оплачено" | "не вдалося" | "повернено";

export interface Size {
  height: number;
  width: number;
}

export interface OrderItem {
  id?: string;
  title: string;
  type: string;
  color: string;
  order_id?: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  size: Size;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_number?: string;
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
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderForm {
  userId?: string; 
  order_name: string;
  customer_name: string;
  customer_number: string | null;
  payment_status: string;
  description: string | null;
  status: OrderStatus;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  items: OrderItem[];
  total: number;
  discount?: number;
}