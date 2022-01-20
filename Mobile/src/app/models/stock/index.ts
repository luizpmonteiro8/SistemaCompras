import { Product } from '../product';

export type Stock = {
  id: number;
  quantity: number;
  product: Product;
};
