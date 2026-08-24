import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginRequest} from '../../../core/models/login-request.model';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {PasswordInput} from '../../../shared/components/password-input/password-input';
import {LoadingDirective} from '../../../shared/directives/loading-directive';
import {finalize} from 'rxjs';
import {SpanSpinner} from '../../../shared/components/span-spinner/span-spinner';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../../core/services/alert-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    PasswordInput,
    LoadingDirective,
    SpanSpinner
  ],
  templateUrl: './login.html',
})
export class Login {
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthApiService);
  alertService = inject(AlertService);

  isLoading = signal(false);

  loginForm: FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  redirectToRegister() {
    this.router.navigate(['/register']).then(() => {});
  }

  redirectToRecover() {
    this.router.navigate(['/recover-account']).then(() => {});
  }

  login(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const credentials: LoginRequest = this.loginForm.value;

    this.authService.login(credentials)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
      next: (result) => {
        if (!result.success) {
          this.authService.currentUser.set(null);
          return;
        }
        this.authService.currentUser.set(result);
        this.router.navigate(['/dashboard']).then(() => {});
      }, error: (error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || error.error?.error || 'El servidor no responde';
        this.alertService.show(errorMessage, 'error');
      }
    })
  }

}
