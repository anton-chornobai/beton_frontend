export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  updatedAt?: string;

  customer: CustomerInfo;
  items: OrderItem[];

  total: number;
  paymentMethod: "card" | "cash" | "paypal";
  paymentStatus: "paid" | "pending" | "failed";

  deliveryMethod: "courier" | "pickup" | "post";
  deliveryAddress?: string;
  deliveryStatus: "pending" | "sent" | "delivered";

  fulfilled: boolean;
  notes?: string;
}
