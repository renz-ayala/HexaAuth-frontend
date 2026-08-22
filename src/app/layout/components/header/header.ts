import {Component, inject} from '@angular/core';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {Router} from '@angular/router';
import {Menu} from '../menu/menu';

@Component({
  selector: 'app-header',
  imports: [
    Menu
  ],
  templateUrl: './header.html',
})
export class Header {
  authService = inject(AuthApiService);
  router = inject(Router);
}
