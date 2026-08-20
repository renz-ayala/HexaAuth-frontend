import {Injectable, signal} from '@angular/core';
import {AlertModel, AlertType} from '../../features/models/alert.model';
import { v4 as uuidv4 } from 'uuid';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private state = signal<AlertModel[]>([]);
  alertState = this.state.asReadonly();

  show(message: string, type: AlertType) {
    const id = environment.production ? crypto.randomUUID() : uuidv4();
    const alert: AlertModel = { id, type, message }

    this.state.update( (alerts) => [...alerts, alert]);

    setTimeout(() => {
      this.close(id);
    }, 10000);
  }

  close(id: string) {
    this.state.update( (alerts) => alerts.filter((alert) => alert.id !== id));
  }

}
