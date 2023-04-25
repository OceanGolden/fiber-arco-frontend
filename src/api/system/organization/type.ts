export interface OrganizationRecord {
  id: string;
  name: string;
  code: string;
  parent_id: string;
  parent_ids: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
  children: OrganizationRecord[];
}

export interface OrganizationParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface OrganizationRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}
