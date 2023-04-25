import request from '@/utils/request';
import type { OrganizationParams, OrganizationRecord, OrganizationRequest } from './type';

const URL = '/system/organizations';

// export const query = async (params: Partial<OrganizationParams>): Promise<PageResponse<OrganizationRecord>> => {
//   return request.get(URL, {
//     params,
//   });
// };

export const queryTree = async (params: Partial<OrganizationParams>): Promise<OrganizationRecord[]> => {
  return request.get(`${URL}/tree`, { params });
};

export const create = async (data: Partial<OrganizationRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<OrganizationRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<OrganizationRequest>) => {
  return request.delete(URL, { data });
};
