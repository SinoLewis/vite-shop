export interface Transaction {
  id?: string;
  merchant_id: string;
  user_id: string;
  order_id: string;
  payment_code: string;
  type: string;
  // ["Mpesa", "Banking", "Offline"];
  status: string;
  // [
  //   "New",
  //   "Cancelled",
  //   "Failed",
  //   "Pending",
  //   "Declined",
  //   "Rejected",
  //   "Success"
  // ];
  created_at: string;
  updated_at: string;
}
