import { Category } from '../category';

export type Product = {
  id: number;
  name: string;
  blocked: boolean;
  quantMin: number;
  category: Category;
};
