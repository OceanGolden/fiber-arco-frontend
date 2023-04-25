import request from '@/utils/request';
import type { PageResponse } from '@/common/types';
import type { DictionaryItemParams, DictionaryItemRecord, DictionaryItemRequest } from './type';

const URL = '/system/dictionary/items';

export const query = async (params: Partial<DictionaryItemParams>): Promise<PageResponse<DictionaryItemRecord>> => {
  return request.get(URL, { params });
};

export const create = async (data: Partial<DictionaryItemRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<DictionaryItemRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<DictionaryItemRequest>) => {
  return request.delete(URL, { data });
};
