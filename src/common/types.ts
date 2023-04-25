export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

export interface HttpResponse<T = any> {
  success: boolean;
  data: T;
  code: number;
  message: string;
}

export interface PageResponse<T> {
  list: T[];
  current: number;
  pageSize: number;
  total: number;
}
