import {Component, computed, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthApi} from '../../../../../core/services/auth-api';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.html',
})
export class Profile {
  authService = inject(AuthApi);

  details = computed(() => {
    const user= this.authService.currentUser();

    return [
      {
        key: 'username',
        label: 'Nombre de Usuario',
        value: user?.username || 'not_found'
      },
      {
        key: 'email',
        label: 'Correo electrónico',
        value: user?.email || 'not_found'
      },
      {
        key: 'names',
        label: 'Nombre de usuario',
        value: user?.firstname || 'not_found'
      },
      {
        key: 'lastnames',
        label: 'Apellidos',
        value: user?.lastname || 'not_found'
      }
    ];
  })


}
