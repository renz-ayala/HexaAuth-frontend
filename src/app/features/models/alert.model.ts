export type AlertType = 'success' | 'error' | 'info';

export interface AlertModel {
  id: string;
  message: string;
  type: AlertType;
}
