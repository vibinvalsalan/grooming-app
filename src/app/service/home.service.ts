import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {AppConfig} from '../config/appconfig';
import {Observable, throwError} from '../../../node_modules/rxjs';

const uri = AppConfig.endpoints.prod;
@Injectable({
  providedIn: 'root'
})
export class HomeService {

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
  GetResult(fDate, tDate): Observable < any > {
    const  param = { frmDate : fDate, toDate: tDate};
    return this
        .http
        .get(uri + 'result', { params: param})
        .pipe(map(res => {
          return res;
        }), catchError(err => this.handleError(err)));
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
