import { IProduct } from "./product";

export interface ICustomerProductPrice {
  id: number;
  product:  IProduct;
  price: number;
}
