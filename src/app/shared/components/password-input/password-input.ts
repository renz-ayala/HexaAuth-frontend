import {Component, computed, input, output, signal} from '@angular/core';

@Component({
  selector: 'app-password-input',
  imports: [],
  templateUrl: './password-input.html',
})
export class PasswordInput {
  label = input<string>('');
  value = input<string>('');
  valueChange = output<string>();

  showPassword = signal(false);
  passwordType = computed(() => this.showPassword() ? 'text' : 'password');

  toggleVisibility(): void {
    this.showPassword.update(v => !v);
  }

  onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.valueChange.emit(val);
  }
}
