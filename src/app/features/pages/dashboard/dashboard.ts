import {Component, computed, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Header} from '../../../layout/components/header/header';
import {NavGroup} from '../../models/dashboard.model';
import {SafeHtmlPipe} from '../../../shared/pipes/safe-html-pipe';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Header, RouterLink, RouterLinkActive, SafeHtmlPipe],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  isMenuVisible = signal(true);
  tooltipMessage = computed(() => this.isMenuVisible() ? 'Colapsar menú' : 'Expandir menú');
  navigationMenu = signal<NavGroup[]>(([
        {
          groupName: 'Cuenta',
          isExpanded: true,
          items: [
            {
              label: 'Perfil',
              route: 'profile',
              icon: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
            },
          ]
        },
        {
          groupName: 'Ajustes',
          isExpanded: true,
          items: [
            {
              label: 'Contraseña',
              route: 'change-password',
              icon: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
            },
            {
              label: 'Inactivar cuenta',
              route: 'inactivate-account',
              icon: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6h12a6 6 0 00-6-6zM21 12h-6"/></svg>`,
            }
          ]
        },
  ]));

  toggleMenu() {
    this.isMenuVisible.update((open) => !open);
  }

  toggleNavGroup(groupIndex: number) {
    this.navigationMenu.update((items) =>
      items.map((group, index) => index === groupIndex ? {...group, isExpanded: !group.isExpanded} : group)
    );
  }
}
