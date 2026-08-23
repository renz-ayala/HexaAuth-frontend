import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface SearchResult {
  label: string;
  route: string;
  category: string;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  private router = inject(Router);

  searchControl = new FormControl('');

  query = signal('');
  isOpen = signal(false);

  routesList = signal<SearchResult[]>([
    { label: 'Ver perfil', route: '/dashboard/profile', category: 'Cuenta' },
    { label: 'Cambiar contraseña', route: '/dashboard/change-password', category: 'Ajustes' },
  ]);

  results = computed(() => {
    const query = this.query().toLowerCase().trim();
    if (!query) {
      return [];
    }

    return this.routesList().filter(item =>
      item.label.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );
  });

  constructor() {
    this.searchControl.valueChanges.subscribe(val => {
      this.query.set(val ?? '');
      this.isOpen.set(true);
    });
  }

  selectOption(route: string) {
    this.router.navigate([route]).then(() => {});
    this.closeDropdown();
  }

  closeDropdown() {
    this.isOpen.set(false);
    this.searchControl.setValue('', { emitEvent: false });
    this.query.set('');
  }
}
