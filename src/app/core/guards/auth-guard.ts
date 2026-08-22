import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthApiService} from '../services/auth-api-service';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthApiService);
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
