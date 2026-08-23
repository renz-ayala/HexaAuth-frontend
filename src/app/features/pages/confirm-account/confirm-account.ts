import {ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../../core/services/auth-api-service';
import { AlertService } from '../../../core/services/alert-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-confirm-account',
  imports: [],
  templateUrl: './confirm-account.html',
})
export class ConfirmAccount implements OnInit {
  route = inject(ActivatedRoute);
  authService = inject(AuthApiService);
  alertService = inject(AlertService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  isLoading = signal(true);
  message = signal('');

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isLoading.set(false);
      this.message.set('Se requiere un token de confirmación');
      setTimeout(() => this.alertService.show('confirmation token is not present', 'info'));
      return;
    }

    this.authService.confirmAccount(token)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (response) => {
          if (!response) {
            setTimeout(() => this.alertService.show('Process failed', 'error'));
            this.message.set('Proceso fallido');
            return;
          }

          this.message.set(response);
          setTimeout(() => this.alertService.show('successfully validation', 'success'))
        },
        error: (err) => {
          const errorMessage = err.error || 'El link es inválido o ha vencido';
          setTimeout(() => this.alertService.show('Error', 'error'));
          this.message.set(errorMessage);
        }
      });
  }

  goToLogin() {
    this.router.navigate(['login']).then(() => {});
  }

  goToRegister() {
    this.router.navigate(['register']).then(() => {});
  }
}
