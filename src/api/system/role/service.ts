import type { RoleMenuParams, RoleMenuRecord, RoleMenuRequest, RoleParams, RoleRecord, RoleRequest } from './type';

import type { PageResponse } from '@/common/types';
import request from '@/utils/request';

const URL = '/system/roles';

export const query = async (params: Partial<RoleParams>): Promise<PageResponse<RoleRecord>> => {
  return request.get(URL, { params });
};

export const queryAll = async (params: Partial<RoleParams>): Promise<RoleRecord[]> => {
  return request.get(`${URL}/all`, { params });
};

export const create = async (data: Partial<RoleRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<RoleRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<RoleRequest>) => {
  return request.delete(URL, { data });
};

export const grantMenus = async (data: Partial<RoleMenuRequest>) => {
  return request.post(`${URL}/menus`, data);
};

export const queryMenus = async (params: Partial<RoleMenuParams>): Promise<RoleMenuRecord[]> => {
  return request.get(`${URL}/menus`, { params });
};
