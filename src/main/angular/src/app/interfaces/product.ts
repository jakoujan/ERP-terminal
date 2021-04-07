import { IUnit } from './unit';
import { IProductType } from './product-type';
import { ITax } from './tax';

export interface IProduct {
    id: number;
    uuid: string;
    code: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    maxDiscount: number;
    active: boolean;
    productType: IProductType;
    tax: ITax;
    unit: IUnit;
}
