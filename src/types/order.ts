// interface imports represents foreign key in Supa DB
import type { Cart } from "./cart";
import type { Transaction } from "./transaction";
import type { UserDetails } from "./user_details";

export interface Order {
  id?: string;
  user_id: string;
  user_address_id: string;
  session_id: string;
  session_token: string;
  status: string;
  // [
  //   "New",
  //   "Checkout",
  //   "Paid",
  //   "Failed",
  //   "Shipped",
  //   "Delivered",
  //   "Returned",
  //   "Complete"
  // ];
  // CART
  cart: Cart;
  // USER DETAILS
  user_details: UserDetails;
  // DELIVERY charges
  shipping: number;
  // TRANSACTION
  transaction: Transaction;
  created_at: string;
  updated_at: string;
}
