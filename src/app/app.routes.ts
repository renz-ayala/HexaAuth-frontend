import { Routes } from '@angular/router';
import {Login} from './features/pages/login/login';
import {authGuard} from './core/guards/auth-guard';
import {Profile} from './features/pages/dashboard/sections/profile/profile';
import {ChangePassword} from './features/pages/dashboard/sections/change-password/change-password';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    loadComponent: () => import('./features/pages/register/register').then(m => m.Register)
  },
  {
    path: 'confirm-account',
    loadComponent: () => import('./features/pages/confirm-account/confirm-account').then(m => m.ConfirmAccount)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/pages/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'change-password',
        loadComponent: () => import('./features/pages/dashboard/sections/change-password/change-password').then(m => m.ChangePassword),
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/pages/dashboard/sections/profile/profile').then(m => m.Profile),
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
