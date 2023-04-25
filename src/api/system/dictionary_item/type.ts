export interface DictionaryItemRecord {
  id: string;
  label: string;
  value: string;
  color: string;
  dictionary_id: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface DictionaryItemParams {
  label: string;
  value: string;
  dictionary_id: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
  total: number;
}

export interface DictionaryItemRequest {
  id: string;
  label: string;
  value: string;
  color: string;
  dictionary_id: string;
  status: string;
  sort: number;
  remark: string;
}
