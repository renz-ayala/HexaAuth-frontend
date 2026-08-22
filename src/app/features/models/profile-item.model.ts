export type ValueType = 'text' | 'badge' | 'code';

export interface ProfileItem {
  key: string;
  label: string;
  value: string;
  type?: ValueType;
  copyable?: boolean;
}
