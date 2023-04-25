import request from '@/utils/request';
import type { PageResponse } from '@/common/types';
import type { PositionParams, PositionRecord, PositionRequest } from './type';

const URL = '/system/positions';

export const query = async (params: Partial<PositionParams>): Promise<PageResponse<PositionRecord>> => {
  return request.get(URL, { params });
};

export const queryAll = async (params: Partial<PositionParams>): Promise<PositionRecord[]> => {
  return request.get(`${URL}/all`, { params });
};

export const create = async (data: Partial<PositionRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<PositionRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<PositionRequest>) => {
  return request.delete(URL, { data });
};
