import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {AlertService} from '../../../core/services/alert-service';
import {Router} from '@angular/router';
import {SpanSpinner} from '../../../shared/components/span-spinner/span-spinner';
import {finalize} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {LoadingDirective} from '../../../shared/directives/loading-directive';
import {ForgotPasswordRequest} from '../../../core/models/forgot-password-request.model';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    SpanSpinner,
    LoadingDirective
  ],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthApiService);
  alertService = inject(AlertService);

  forgotForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]]
  });

  isLoading = signal(false);

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading.set(true);
    const request: ForgotPasswordRequest = this.forgotForm.value;

    this.authService.recoverAccount(request)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () =>
          this.alertService.show('Se ha enviado un correo con las instrucciones.', 'success'),
        error: (err: HttpErrorResponse) => {
          let errorMessage = err.error?.detalle || err.error?.message || err.error?.error || 'Hay problemas en el servicio';
          this.alertService.show(errorMessage, 'error')
        }
      });
  }

  redirectToLogin() {
    this.router.navigate(['/login']).then(() => {});
  }
}
