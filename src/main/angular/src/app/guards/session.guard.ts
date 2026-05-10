import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { constants } from 'src/environments/environment';
import { Session } from '../interfaces/session';
import { SecurityService } from '../services/security.service';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard  {

  constructor(private router: Router, private securityService: SecurityService, private sessionStorage: SessionStorageService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const session: Session = this.sessionStorage.retrieve(constants.SESSION);
    return session ? session.token != undefined : false;
  }

}
