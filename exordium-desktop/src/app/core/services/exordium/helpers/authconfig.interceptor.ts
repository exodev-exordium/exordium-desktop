import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './../auth/auth.service';


@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken
      }
    });

    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // token still valid
        }
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          // token no longer valid
          if (error.status === 401) {
              this.authService.signout();
          }
      }
      }
    ));
  }
}