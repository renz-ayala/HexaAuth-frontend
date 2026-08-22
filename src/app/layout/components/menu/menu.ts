import {Component, computed, inject, signal} from '@angular/core';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {Router} from '@angular/router';
import {ThemeService} from '../../../core/services/theme-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    NgClass
  ],
  templateUrl: './menu.html',
})
export class Menu {
  authService = inject(AuthApiService);
  router = inject(Router);
  themeService = inject(ThemeService);

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
