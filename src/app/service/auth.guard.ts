import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Type } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  Guard = 'AuthGuard';
  Roles = 'roles';
  constructor(private auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const CheckRoles = next.data[this.Roles] as string[];
      const IsAllowed = this.roleMatch(CheckRoles);

      if (this.auth.isLoggedIn) {
        if (IsAllowed) {
          return true;
        }
        return false;
      }
      this.auth.GetRole(). subscribe( res => {
        console.log(this.Guard, res);
        if (this.auth.isLoggedIn) {
          if (IsAllowed) {
            return true;
          }
          return false;
        } else {
          return false;
        }
      });
  }

  roleMatch(a: string[]): boolean {
    const b = this.auth.UserRole;
    console.log(a.some(v => v === b ));
    return a.some(v => v === b );
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
