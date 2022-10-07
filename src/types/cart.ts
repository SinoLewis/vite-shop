import type { Product } from "./product";

export interface Cart {
  id?: string;
  user_id?: string;
  username?: string;
  status: string,
  // ["Cart", "Checkout", "Paid", "Complete"];
  cart_products: Product[];
  created_at?: any;
  updated_at: any;
}
