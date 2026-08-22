import { Injectable, signal} from '@angular/core';
import {ThemeOption} from '../models/theme-option.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themes: ThemeOption[] = [
    { id: 'custom', label: 'Darkness' },
    { id: 'dark', label: 'Dark' },
    { id: 'sunset', label: 'Sunset' },
    { id: 'nord', label: 'Nord' },
    { id: 'emerald', label: 'Emerald' },
    { id: 'light', label: 'Light' },
  ];
  currentTheme = signal(document.documentElement.getAttribute('data-theme') || 'custom');

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme.set(theme);
  }

}
