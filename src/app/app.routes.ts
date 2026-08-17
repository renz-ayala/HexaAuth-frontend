import { Routes } from '@angular/router';
import {Login} from './features/pages/login/login';
import {Register} from './features/pages/register/register';
import {Dashboard} from './features/pages/dashboard/dashboard';
import {authGuard} from './core/guards/auth-guard';

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
    component: Register
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
