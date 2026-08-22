import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './change-password.html',
})
export class ChangePassword {
  private readonly fb = inject(FormBuilder);

  readonly changePasswordForm: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  onChangePassword(): void {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;

      // Aquí llamas a tu servicio HTTP en AuthApi para cambiar la contraseña
      console.log('Enviando cambio de clave:', { currentPassword, newPassword });
    }
  }

}
