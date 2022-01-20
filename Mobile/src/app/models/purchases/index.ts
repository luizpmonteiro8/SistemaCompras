import { Market } from '../market';
import { Product } from '../product';

export type itemPurchase = {
  id: number;
  quantity: number;
  validaty: Date;
  price: number;
  SubTotal: number;
  stock: {
    id: number;
    quantity: number;
    product: Product;
  };
};

export type Purchases = {
  id: number;
  date: Date;
  market: Market;
  status: string;
  itemPurchaseList: itemPurchase[];
  total: number;
};
