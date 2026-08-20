import {Component, inject} from '@angular/core';
import {AlertModel, AlertType} from '../../../features/models/alert.model';
import {AlertService} from '../../../core/services/alert-service';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
})
export class Alert {
  alertService = inject(AlertService);
  alerts = this.alertService.alertState;

  readonly styles: Record<AlertType, string> = {
    success: 'bg-[#000000]/90 border-emerald-500/40 text-emerald-400',
    error: 'bg-[#000000]/90 border-rose-500/40 text-rose-400',
    info: 'bg-[#000000]/90 border-amber-500/40 text-amber-400',
  };
}
