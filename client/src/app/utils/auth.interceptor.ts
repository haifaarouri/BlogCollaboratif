import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('access_token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return auth.refreshToken().pipe(
          switchMap((res) => {
            const newToken = res.token;
            localStorage.setItem('access_token', newToken);
            return next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
                withCredentials: true,
              })
            );
          }),
          catchError(() => {
            auth.logout();
            router.navigate(['/login']);
            return throwError(() => new Error('Session expired.'));
          })
        );
      }

      return throwError(() => err);
    })
  );
};
