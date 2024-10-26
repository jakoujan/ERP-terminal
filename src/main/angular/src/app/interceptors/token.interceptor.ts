import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { constants, environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Session } from '../interfaces/session';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: SessionStorageService, private router: Router, private spinner: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show("Cargando");
    const session: Session = this.storage.retrieve(constants.SESSION);
    let url = request.url;
    if (url.indexOf('api') >= 0 || url.indexOf('security') >= 0) {
      url = environment.API_URL + url;
    }
    if (session) {
      request = request.clone({
        url: url,
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${session.token}`
        }
      });
    } else {
      request = request.clone({
        url: url,
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
    }
    return next.handle(request).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        this.spinner.hide();
      }
    },
      (err: any) => {
        this.spinner.hide();
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.storage.clear();
          this.router.navigate(['login']);
        }
      }));
  }
}
