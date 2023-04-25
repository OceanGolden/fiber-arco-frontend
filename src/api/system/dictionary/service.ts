import request from '@/utils/request';
import type { PageResponse } from '@/common/types';
import type { DictionaryItemRecord } from '../dictionary_item/type';
import type { DictionaryParams, DictionaryRecord, DictionaryRequest } from './type';

const URL = '/system/dictionaries';

export const query = async (params: Partial<DictionaryParams>): Promise<PageResponse<DictionaryRecord>> => {
  return request.get(URL, { params });
};

export const queryItems = async (code: string): Promise<DictionaryItemRecord[]> => {
  return request.get(`${URL}/items`, {
    params: { code },
  });
};

export const create = async (data: Partial<DictionaryRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<DictionaryRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<DictionaryRequest>) => {
  return request.delete(URL, { data });
};
