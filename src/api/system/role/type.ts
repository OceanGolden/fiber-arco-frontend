export interface RoleRecord {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface RoleParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface RoleRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}

export interface RoleMenuRecord {
  id: string;
  role_id: string;
  menu_id: string;
  created_at: number;
  created_by: string;
}

export interface RoleMenuParams {
  role_id: string;
}

export interface RoleMenuRequest {
  role_id: string;
  menu_ids: string[];
}
