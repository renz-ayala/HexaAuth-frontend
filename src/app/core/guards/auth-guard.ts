import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthApi} from '../services/auth-api';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthApi);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true;
  }

  return authService.checkSession().pipe(
    map(userResponse => {
      authService.currentUser.set(userResponse);
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']).then(() => {});
      return of(false);
    })
  )
};
