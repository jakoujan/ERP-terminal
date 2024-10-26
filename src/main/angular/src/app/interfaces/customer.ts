import { ICustomerProductPrice } from "./customer-product-price";

export interface ICustomer {
  id: number;
  uuid: string;
  businessName: string;
  contact: string;
  productPrices: ICustomerProductPrice[];
}

export const customer: ICustomer = {
  id: undefined,
  uuid: undefined,
  businessName: undefined,
  contact: undefined,
  productPrices: [],
}
