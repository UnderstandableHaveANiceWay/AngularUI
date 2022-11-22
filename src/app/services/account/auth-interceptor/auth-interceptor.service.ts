import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        () => {
          if (req.url.startsWith('api')) {
            console.log(req);
            const token = this.authService.getAccessToken();
            const headers = req.headers.set('Authorization', `Bearer ${token}`);
            const authRequest = req.clone({ headers });

            return next.handle(authRequest);
          } else {

            return next.handle(req);
            
          }
        }
      );
  }
}
