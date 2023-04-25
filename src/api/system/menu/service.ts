import type { MenuParams, MenuRecord, MenuRequest } from './type';

import request from '@/utils/request';

const URL = '/system/menus';

export const queryTreeAll = async (params: Partial<MenuParams>): Promise<MenuRecord[]> => {
  return await request.get(`${URL}/tree/all`, {
    params,
  });
};

export const queryTree = async (): Promise<MenuRecord[]> => {
  return await request.get(`${URL}/tree`);
};

export const create = async (data: Partial<MenuRequest>) => {
  return await request.post(URL, data);
};

export const update = async (data: Partial<MenuRequest>) => {
  return await request.put(URL, data);
};

export const remove = async (data: Partial<MenuRequest>) => {
  return await request.delete(URL, { data });
};
