import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {AppConfig} from '../config/appconfig';
import {Observable, throwError} from '../../../node_modules/rxjs';
import { Useraccess } from '../model/useraccess';
import { stringify } from '@angular/core/src/util';

const uri = AppConfig.endpoints.prod;
const isLoggedIn = AppConfig.isLoggedIn;
const useraccess = AppConfig.userAccess;
@Injectable({providedIn: 'root'})
export class AuthService {
  private loggedInStatus = JSON.parse(sessionStorage.getItem(isLoggedIn) || 'false' );
  httpHeaders: HttpHeaders;
  options: any;
    constructor(private http: HttpClient) {
      this.httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Cache-Control', 'no-cache');
      this.options = {
          headers: this.httpHeaders
      };
    }
    GetRole(): Observable < any > {
      return this
          .http
          .get(uri + 'checkaccess')
          .pipe(map(res => {
            sessionStorage.setItem(useraccess, JSON.stringify(res));
            this.setLoggedIn(Object.assign(new Useraccess(), res));
            return res;
          }), catchError(err => this.handleError(err)));
  }

  setLoggedIn(ua: Useraccess) {
    this.loggedInStatus = ua.Authenticated;
    sessionStorage.setItem(isLoggedIn, JSON.stringify(ua.Authenticated));
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  get isLoggedIn() {
    return JSON.parse(sessionStorage.getItem(isLoggedIn) || 'false' );
  }
  get UserRole(): string {
    const u: Useraccess = JSON.parse(sessionStorage.getItem(useraccess) || null);
    if (u != null) {
      return u.Roles;
    }
    return null;
  }

    private handleError(error: any) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        return throwError(error.error.Message);
    }
}
