import { MenuRecord } from '@/api/system/menu/type';
import { StaffRecord } from '@/api/system/staff/type';

export interface LoginRequest {
  username: string;
  password: string;
  isRemember: boolean;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface UserInfoState {
  staff: Partial<StaffRecord>;
  menus: MenuRecord[];
  permissions: string[];
}
