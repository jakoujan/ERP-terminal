import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IResponse } from '../interfaces/response';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private static LOGIN = 'security/login';
  private static LOGOUT = 'api/security/logout';

  private accessorEmitter: Subject<IUser> = new Subject<IUser>();

  constructor(protected http: HttpClient) {
  }

  public login(user: IUser): Observable<IResponse> {
    return this.http.post<IResponse>(SecurityService.LOGIN, user);
  }

  public setUserData(): Observable<IUser> {
    return this.accessorEmitter.asObservable();
  }

  public updateUserData(user: IUser) {
    this.accessorEmitter.next(user);
  }

  public logout(user: IUser): Observable<IResponse> {
    return this.http.post<IResponse>(SecurityService.LOGOUT, user);
  }


}
