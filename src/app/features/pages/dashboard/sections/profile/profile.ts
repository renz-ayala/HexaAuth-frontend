import {Component, computed, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthApiService} from '../../../../../core/services/auth-api-service';
import {ProfileItem, ValueType} from '../../../../models/profile-item.model';
import {NgClass} from '@angular/common';

const FALLBACK_VALUE = 'not_found';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './profile.html',
})
export class Profile {
  authService = inject(AuthApiService);

  details = computed<ProfileItem[]>(() => {
    const user= this.authService.currentUser();
    return [
      {
        key: 'username',
        label: 'Nombre de Usuario',
        value: user?.username ? `@${user.username}` : FALLBACK_VALUE,
        type: 'badge'
      },
      {
        key: 'email',
        label: 'Correo electrónico',
        value: user?.email ?? FALLBACK_VALUE,
        type: 'code'
      },
      {
        key: 'names',
        label: 'Nombres',
        value: user?.firstname ?? FALLBACK_VALUE,
        type: 'text'
      },
      {
        key: 'lastnames',
        label: 'Apellidos',
        value: user?.lastname ?? FALLBACK_VALUE,
        type: 'text'
      }
    ];
  });

  getItemClasses(type?: ValueType): string {
    switch (type) {
      case 'code':
        return 'font-mono text-xs bg-zinc-950/80 px-2.5 py-1 rounded-md border border-zinc-800 text-zinc-300';
      case 'badge':
        return 'text-xs bg-zinc-800/60 px-2.5 py-1 rounded-md border border-zinc-700/50 text-zinc-200';
      default:
        return 'text-sm font-medium text-zinc-100';
    }
  }


}
