import { ICustomer } from "./customer";
import { IProductOrder } from "./product-order";
import { ISaleType } from "./sale-type";
import { IUser } from "./user";

export interface ISaleOrder {
  id: number;
  uuid: string;
  orderDate: Date;
  amount: number;
  taxes: number;
  total: number;
  saleType: ISaleType;
  products: Array<IProductOrder>;
  customer: ICustomer;
  user: IUser;
}
