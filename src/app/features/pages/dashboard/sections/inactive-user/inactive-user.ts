import {Component, inject, signal, viewChild} from '@angular/core';
import {AuthApiService} from '../../../../../core/services/auth-api-service';
import {Router} from '@angular/router';
import {AlertService} from '../../../../../core/services/alert-service';
import {finalize} from 'rxjs';
import {LoadingDirective} from '../../../../../shared/directives/loading-directive';
import {SpanSpinner} from '../../../../../shared/components/span-spinner/span-spinner';
import {ConfirmModal} from '../../../../../shared/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-inactive-user',
  imports: [
    LoadingDirective,
    SpanSpinner,
    ConfirmModal
  ],
  templateUrl: './inactive-user.html',
})
export class InactiveUser {
  userService = inject(AuthApiService);
  alertService = inject(AlertService);
  router = inject(Router);

  confirmModal = viewChild.required(ConfirmModal);
  isDeactiveLoading = signal(false);
  isDeleteLoading = signal(false);

  async onInactivateAccount(): Promise<void> {
    const confirmed = await this.confirmModal().open({
      title: 'Desactivar Cuenta',
      message: '¿Estás seguro de que deseas desactivar tu cuenta? Deberás restablecer tu contraseña para volver a ingresar.',
      confirmText: 'Sí, desactivar',
      cancelText: 'Cancelar'
    });

    if (!confirmed) return;

    this.isDeactiveLoading.set(true);

    this.userService.inactiveAccount()
      .pipe(finalize(() => this.isDeactiveLoading.set(false)))
      .subscribe({
      next: () => {
        this.alertService.show('Se ha inactivado la cuenta', 'info');
        this.router.navigate(['/login']).then(() => {});
      },
      error: (err) => {
        console.error('Error al inactivar la cuenta:', err);
        this.alertService.show('Ha ocurrido un error inactivando la cuenta', 'error');
      }
    });
  }

  async onDeleteAccount(): Promise<void> {
    const confirmDelete = await this.confirmModal().open({
      title: 'Eliminar Cuenta',
      message: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar'
    });

    if (!confirmDelete) {
      return;
    }

    this.isDeleteLoading.set(true);

    this.userService.deleteAccount()
      .pipe(finalize(() => this.isDeleteLoading.set(false)))
      .subscribe({
        next: () => {
          this.alertService.show('Se ha eliminado la cuenta', 'info');
          this.router.navigate(['/login']).then(() => {});
        },
        error: (err) => {
          console.error('Error al eliminar la cuenta:', err);
          this.alertService.show('Ha ocurrido un error eliminando la cuenta', 'error');
        }
      });
  }

}
