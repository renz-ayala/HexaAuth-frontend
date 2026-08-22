import {Component, computed, inject} from '@angular/core';
import {AuthApi} from '../../../core/services/auth-api';
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
  authService = inject(AuthApi);
  router = inject(Router);

  initials = computed(() => {
    const nameFirstLetter = this.authService.currentUser()?.firstname.substring(0, 1);
    const lastnameFistLetter = this.authService.currentUser()?.lastname.substring(0, 1);
    return `${nameFirstLetter}${lastnameFistLetter}`;
  });

}
