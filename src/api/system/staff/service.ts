import type { StaffParams, StaffRecord, StaffRequest, StaffRoleRequest } from './type';

import type { PageResponse } from '@/common/types';
import request from '@/utils/request';

const URL = '/system/staffs';

export const query = async (params: Partial<StaffParams>): Promise<PageResponse<StaffRecord>> => {
  return request.get(URL, { params });
};

export const create = async (data: Partial<StaffRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<StaffRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<StaffRequest>) => {
  return request.delete(URL, { data });
};

export const assignRole = async (data: StaffRoleRequest) => {
    return request.post(`${URL}/roles`, data);
  };
