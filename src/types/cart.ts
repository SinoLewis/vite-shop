import type { Product } from "./product";

export interface CartProducts {
  [key: string]: Product
}

export interface Cart {
  id: string;
  user_id?: string;
  total_price: number;
  total_products: number;
  total_quantity: number;
  total_discounted: number;
  status: string,
  // ["Cart", "Checkout", "Paid", "Complete"];
  cart_products: string[];
  created_at?: any;
  updated_at: any;
}
