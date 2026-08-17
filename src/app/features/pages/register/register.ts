import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthApi} from '../../../core/services/auth-api';
import {CreateUserRequest} from '../../../core/models/create-user-request.model';

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
  apiAuth = inject(AuthApi);

  registerForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  redirectToLogin(){
    this.router.navigate(['/Login']).then(() => {});
  }

  createUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const newUser: CreateUserRequest = this.registerForm.value;
    this.apiAuth.createUser(newUser).subscribe({
      next: (response) => {
        console.log(response);
      }, error: (error) => {
        console.log(error);
      }
    });
  }

}
