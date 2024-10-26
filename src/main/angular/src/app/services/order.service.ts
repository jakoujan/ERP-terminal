import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISaleOrderFilter } from '../filters/sale-order-filter';
import { IResponse } from '../interfaces/response';
import { ISaleOrder } from '../interfaces/sale-order';
import { Service } from './service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends Service {

  constructor(private http: HttpClient) {
    super();
  }

  private static SAVE_ORDER = 'api/order/set';
  private static PRINT_ORDER = 'pos/order/print';
  public static ORDER = '/api/order/';

  public save(order: ISaleOrder): Observable<IResponse> {
    const params = [
      { name: 'paid', value: environment.PAID_SALE }
    ];
    return this.http.post<IResponse>(Service.getApiUrl(OrderService.SAVE_ORDER, params), order);
  }

  public print(order: ISaleOrder): Observable<IResponse> {
    return this.http.post<IResponse>(OrderService.PRINT_ORDER, order);
  }

  public order(uuid: string): Observable<IResponse> {
    const params = [
      { name: 'uuid', value: uuid }
    ];
    return this.http.get<IResponse>(Service.getApiUrl(OrderService.ORDER, params));
  }

  public filter(filter: ISaleOrderFilter): Observable<IResponse> {
    return this.http.post<IResponse>(OrderService.ORDER, filter);
  }

}
