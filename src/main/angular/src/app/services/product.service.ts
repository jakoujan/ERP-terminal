import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductViewFilter } from '../filters/product-filter';
import { IProduct } from '../interfaces/product';
import { IResponse } from '../interfaces/response';
import { IParam, Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  private static PRODUCT_LIST = 'api/products';
  private static PRODUCT = 'api/products/product';

  public filter(filter: IProductViewFilter): Observable<IResponse> {
    return this.http.post<IResponse>(ProductService.PRODUCT_LIST, filter);
  }

  public findProduct(id: number): Observable<IResponse> {
    const params: Array<IParam> = [
      { name: 'id', value: id }
    ];
    return this.http.get<IResponse>(Service.getApiUrl(ProductService.PRODUCT, params));
  }
}
