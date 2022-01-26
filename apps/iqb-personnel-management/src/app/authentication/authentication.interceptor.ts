import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterState } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('jwt_token');
    let request: HttpRequest<unknown> = req;

    if (accessToken) {
      request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error && error.status === 401) {
          if (!this.authenticationService.isLoggedIn()) {
            this.authenticationService.logout();
          }

          const state: RouterState = this.router.routerState;
          const { snapshot } = state;

          this.router.navigate(['/login'], {
            queryParams: {
              return: snapshot.url,
            },
          });
        }

        return throwError(error);
      })
    );
  }
}
