import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
})
export class ConfirmModal {
  isOpen = signal<boolean>(false);
  title = signal<string>('¿Estás seguro?');
  message = signal<string>('');
  confirmText = signal<string>('Confirmar');
  cancelText = signal<string>('Cancelar');

  private resolveFn?: (value: boolean) => void;

  open(config: { title?: string; message: string; confirmText?: string; cancelText?: string }): Promise<boolean> {
    this.title.set(config.title ?? '¿Estás seguro?');
    this.message.set(config.message);
    if (config.confirmText) this.confirmText.set(config.confirmText);
    if (config.cancelText) this.cancelText.set(config.cancelText);

    this.isOpen.set(true);

    return new Promise<boolean>((resolve) => {
      this.resolveFn = resolve;
    });
  }

  confirm(): void {
    this.isOpen.set(false);
    this.resolveFn?.(true);
  }

  cancel(): void {
    this.isOpen.set(false);
    this.resolveFn?.(false);
  }
}
