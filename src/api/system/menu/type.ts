import { ReactNode } from 'react';

export interface MenuRecord {
  id: string;
  name: string;
  parent_id: string;
  icon: string;
  path: string;
  permission: string;
  type: string;
  method: string;
  component: string;
  link: string;
  visible: boolean;
  redirect: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
  children?: MenuRecord[];
}

export interface MenuRecordWithIcon {
  id: string;
  name: string;
  parent_id: string;
  icon: ReactNode;
  path: string;
  permission: string;
  type: string;
  method: string;
  component: string;
  link: string;
  visible: boolean;
  redirect: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
  children?: MenuRecord[];
}

export interface MenuParams {
  name: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface MenuRequest {
  id: string;
  name: string;
  parent_id: string;
  icon: string;
  path: string;
  permission: string;
  type: string;
  method: string;
  status: string;
  sort: number;
  remark: string;
}
