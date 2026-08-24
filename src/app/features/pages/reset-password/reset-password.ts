import {Component, inject, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {PasswordInput} from '../../../shared/components/password-input/password-input';
import {LoadingDirective} from '../../../shared/directives/loading-directive';
import {SpanSpinner} from '../../../shared/components/span-spinner/span-spinner';
import {finalize} from 'rxjs';
import {AlertService} from '../../../core/services/alert-service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  imports: [
    PasswordInput,
    ReactiveFormsModule,
    LoadingDirective,
    SpanSpinner
  ],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthApiService);
  alertService = inject(AlertService);

  isLoading = signal<boolean>(false);
  token = signal<string>('');

  resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  ngOnInit(): void {
    const tokenUrl = this.route.snapshot.queryParams['token'];

    if (!tokenUrl) {
      this.alertService.show('Ocurrió un error al restablecer la cuenta', 'info')
      return;
    }

    this.token.set(tokenUrl);
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetForm.invalid || !this.token()) return;

    this.isLoading.set(true);

    const request = {
      token: this.token(),
      password: this.resetForm.value.password
    };

    this.authService.resetPassword(request)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.authService.currentUser.set(null);
            return;
          }
          this.authService.currentUser.set(response);
          this.router.navigate(['/dashboard']).then(() => {});
          },
        error: (err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || err.error?.error || err.error[0]?.detalle || 'El servidor no responde';
          this.alertService.show(errorMessage, 'error');
        }
      });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']).then(() => {});
  }
}
