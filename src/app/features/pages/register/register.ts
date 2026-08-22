import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthApiService} from '../../../core/services/auth-api-service';
import {CreateUserRequest} from '../../../core/models/create-user-request.model';
import {AlertService} from '../../../core/services/alert-service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
})
export class Register {
  router = inject(Router);
  fb = inject(FormBuilder)
  apiAuth = inject(AuthApiService);
  alertService = inject(AlertService);

  registerForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  redirectToLogin(){
    this.router.navigate(['/login']).then(() => {});
  }

  createUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const newUser: CreateUserRequest = this.registerForm.value;
    this.apiAuth.createUser(newUser).subscribe({
      next: (response) => {
        if (!response) {
          this.alertService.show('Hubo problemas creado el usuario', 'error');
          return;
        }

        if (!response.success) {
          this.alertService.show(response.message, 'error');
          return;
        }

        this.alertService.show(response.message, 'success');
        this.alertService.show('Revise su correo para confirmar la cuenta', 'info');

        this.redirectToLogin();
      }, error: (error: HttpErrorResponse) => {
        const message = error.error?.detalle || error.error?.error || 'Error en la solicitud';
        console.error('create-user', error);
        this.alertService.show(message, 'error');
      }
    });
  }

}
