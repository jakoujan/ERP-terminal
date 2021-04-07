import { IProduct } from "./product";
import { ISaleOrder } from "./sale-order";

export interface IProductOrder {
  id: number;
  quantity: number;
  price: number;
  amount: number;
  pieces: number;
  product: IProduct;
}
