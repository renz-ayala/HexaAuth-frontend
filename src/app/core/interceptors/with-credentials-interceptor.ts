import {HttpBackend, HttpClient, HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, catchError, filter, switchMap, take, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean>(false);

export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const handler = inject(HttpBackend);

  const authReq = req.clone({
    withCredentials: true
  });

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401 || req.url.includes('/public')) {
        return throwError(()=> err);
      }

      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((isRefreshed) => isRefreshed),
          take(1),
          switchMap(() => next(authReq))
        );
      }

      isRefreshing = true;
      refreshTokenSubject.next(false);

      const refreshClient = new HttpClient(handler);

      return refreshClient.post(`${environment.urlAuth}/users/public/refresh`, {}, { withCredentials: true }).pipe(
        switchMap(() => {
          isRefreshing = false;
          refreshTokenSubject.next(true);
          return next(authReq);
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          refreshTokenSubject.next(false);
          router.navigate(['/login']).then(()=>{});
          return throwError(() => refreshError);
        })
      );
    })
  );
};
