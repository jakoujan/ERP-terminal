import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IParam, Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService extends Service {

  private static CUSTOMERS_LIST = 'api/catalogs/customers';
  private static PRODUCT_TYPE_LIST = 'api/catalogs/product/types';
  private static SALE_TYPES_LIST = 'api/catalogs/sales/types';
  private static PRINTERS_LIST = 'pos/configuration/printers';

  constructor(protected http: HttpClient) {
    super();
  }

  public customers(): Observable<any> {
    return this.http.get(CatalogsService.CUSTOMERS_LIST);
  }

  public getProductTypes(): Observable<any> {
    const params: IParam[] = [
      { name: 'saleable', value: false }
    ];
    return this.http.get(Service.getApiUrl(CatalogsService.PRODUCT_TYPE_LIST, params));
  }

  public getSaleTypes(): Observable<any> {
    return this.http.get(CatalogsService.SALE_TYPES_LIST);
  }

  public getPrinters(): Observable<any> {
    return this.http.get(CatalogsService.PRINTERS_LIST);
  }
}
