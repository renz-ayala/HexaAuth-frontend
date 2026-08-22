export interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

export interface NavGroup {
  groupName: string;
  items: NavItem[];
}
