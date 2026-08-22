import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Header} from '../../../layout/components/header/header';
import {NavGroup} from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Header, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  readonly navigationMenu: NavGroup[] = [
    {
      groupName: 'Cuenta',
      items: [
        { label: 'Perfil', route: 'profile' },
      ]
    },
    {
      groupName: 'Ajustes',
      items: [
        { label: 'Contraseña', route: 'change-password' },
      ]
    },
  ];
}
