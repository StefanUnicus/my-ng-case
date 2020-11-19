import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

//class that injects the access token into http requests so that it does not need to be added manually for each.
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    
    constructor(private authenticationService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("access_token")

        if(this.authenticationService.isUserLoggedIn() && req.url.indexOf('authenticate') === -1) {
            const authReq = req.clone({headers: new HttpHeaders({'Content-type':'application/json'})});
            return next.handle(authReq);
        } else if(token) {
            const tokenClone = req.clone({headers: req.headers.set("Authorization", "Bearer " + token)})
        } else {
            return next.handle(req);
        }
    }
}