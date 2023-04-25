export interface PositionRecord {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface PositionParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface PositionRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}
