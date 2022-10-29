export interface Product {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  SKU: string;
  price: number;
  rating: number;
  discount: number;
  quantity: number;
  available: boolean;
  image_url: string;
  publish_date?: string;
  lastmod?: string;
}
