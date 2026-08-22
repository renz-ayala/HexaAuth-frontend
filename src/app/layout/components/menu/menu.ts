import {Component, computed, inject} from '@angular/core';
import {AuthApi} from '../../../core/services/auth-api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
})
export class Menu {
  authService = inject(AuthApi);
  router = inject(Router);

  fullname = computed(() => {
    const firstname = this.authService.currentUser()?.firstname;
    const lastname = this.authService.currentUser()?.lastname;
    return `${firstname} ${lastname}`;
  })

  logout(): void {
    this.authService.logout().subscribe({
        next: () => this.router.navigate(['login']),
        error: () => this.router.navigate(['login'])
    });
  }

}
