import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/response';
import { IParam, Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {

  }

  private static CUSTOMER = 'api/customers/pos/customer';
  private static CUSTOMER_LIST_NAME = 'api/customers/pos/customer/name';

  public customers(name: string): Observable<IResponse> {
    const params: Array<IParam> = [
      { name: 'name', value: name }
    ];
    return this.http.get<IResponse>(Service.getApiUrl(CustomerService.CUSTOMER_LIST_NAME, params));
  }

  public findCustomer(uuid: string): Observable<IResponse> {
    const params: Array<IParam> = [
      { name: 'uuid', value: uuid }
    ];
    return this.http.get<IResponse>(Service.getApiUrl(CustomerService.CUSTOMER, params));
  }
}
