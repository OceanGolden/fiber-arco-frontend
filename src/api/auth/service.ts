import request from '@/utils/request';

import { LoginRequest, LoginResponse, UserInfoState } from './type';

const URL = '/auth';

export const login = async (data: Partial<LoginRequest>): Promise<LoginResponse> => request.post(`${URL}/login`, data);

export const logout = async () => request.post(`${URL}/logout`);

export const refresh = async () => request.post(`${URL}/refresh`);

export const info = async (): Promise<UserInfoState> => request.get(`${URL}/info `);
