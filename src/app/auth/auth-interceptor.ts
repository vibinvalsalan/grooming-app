import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedreq = req.clone({
            headers: req.headers.set('Access-Control-Allow-Origin', '*')
        });
        return next.handle(clonedreq).pipe (
            tap (
                succ => { },
                err => {
                    if (err.status === 401) {
                        this.router.navigateByUrl('/401');
                    } else if (err.status === 403) {
                        this.router.navigateByUrl('/login');
                    }
                }
            )
        );
    }
}