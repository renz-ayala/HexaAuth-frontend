import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthApiService} from '../../../../../core/services/auth-api-service';
import {ChangePasswordRequest} from '../../../../../core/models/change-password-request.model';
import {AlertService} from '../../../../../core/services/alert-service';
import {HttpErrorResponse} from '@angular/common/http';
import {PasswordInput} from '../../../../../shared/components/password-input/password-input';
import {LoadingDirective} from '../../../../../shared/directives/loading-directive';
import {SpanSpinner} from '../../../../../shared/components/span-spinner/span-spinner';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    PasswordInput,
    LoadingDirective,
    SpanSpinner
  ],
  templateUrl: './change-password.html',
})
export class ChangePassword {
  fb = inject(FormBuilder);
  authService = inject(AuthApiService);
  alertService = inject(AlertService);

  isLoading = signal(false);

  changePasswordForm: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  changePassword(): void {
    if (!this.changePasswordForm.valid) {
      this.alertService.show('Valide los campos', 'error');
      return;
    }

    this.isLoading.set(true);

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
    const request: ChangePasswordRequest = {
      oldPassword: currentPassword,
      newPassword1: newPassword,
      newPassword2: confirmPassword
    };
    this.authService.changePassword(request)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
      next: () => {
        this.alertService.show('Contraseña actualizada', 'success');
        this.changePasswordForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        let errorMessage = err.error?.detalle || err.error?.message || err.error?.error || 'Hay problemas en el servicio';
        if (errorMessage.includes('problem:')) {
          errorMessage = errorMessage.split('problem:')[1].trim();
        }
        this.alertService.show(errorMessage, 'error');
      }
    });
  }
}
