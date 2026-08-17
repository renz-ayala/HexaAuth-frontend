import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginRequest} from '../../../core/models/login-request.model';
import {AuthApi} from '../../../core/services/auth-api';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
})
export class Login {
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthApi);

  loginForm: FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  redirectToRegister() {
    this.router.navigate(['/register']).then(() => {});
  }

  login(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials: LoginRequest = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (result) => {
        if (!result.success) {
          this.authService.currentUser.set(null);
          return;
        }
        this.authService.currentUser.set(result);
        this.router.navigate(['/dashboard']).then(() => {});
      }, error: error => {
        console.error(error);
      }
    })

  }

}
