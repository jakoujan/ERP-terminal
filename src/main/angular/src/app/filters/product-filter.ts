import { IFilter } from './filter';
import { IProduct } from '../interfaces/product';
import { IProductView } from '../interfaces/view/product-view';

export interface IProductFilter extends IFilter<IProduct> {

}

export interface IProductViewFilter extends IFilter<IProductView> {

}
