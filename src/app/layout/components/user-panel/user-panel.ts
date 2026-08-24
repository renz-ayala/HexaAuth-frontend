import {Component, computed, inject, signal} from '@angular/core';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {Router} from '@angular/router';
import {ThemeService} from '../../../core/services/theme-service';
import {NgClass} from '@angular/common';
import {LoadingDirective} from '../../../shared/directives/loading-directive';
import {SpanSpinner} from '../../../shared/components/span-spinner/span-spinner';

@Component({
  selector: 'app-user-panel',
  imports: [
    NgClass,
    LoadingDirective,
    SpanSpinner
  ],
  templateUrl: './user-panel.html',
})
export class UserPanel {
  authService = inject(AuthApiService);
  router = inject(Router);
  themeService = inject(ThemeService);

  isLoading = signal(false);

  fullname = computed(() => {
    const firstname = this.authService.currentUser()?.firstname;
    const lastname = this.authService.currentUser()?.lastname;
    return `${firstname} ${lastname}`;
  })

  logout(): void {
    this.isLoading.set(true);
    this.authService.logout().subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['login']).then(() => {});
        },
        error: () => {
          this.isLoading.set(false);
          this.router.navigate(['login']).then(() => {});
        }
    });
  }

}
