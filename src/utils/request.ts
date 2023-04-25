import type { AxiosError, AxiosResponse } from 'axios';

import axios from 'axios';

import { Token } from '@/common/constants';
import { Notification } from '@arco-design/web-react';

import Storage from './storage';

import type { HttpResponse } from '@/common/types';
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const instance = axios.create({
  baseURL: '/api',
  timeout: 1 * 1000,
  withCredentials: true,
});

instance.defaults.timeout = 3 * 1000;

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    const token = Storage.get(Token.Access);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 拦截响应
instance.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const { success, code, message, data } = response.data;
    // // 错误
    // if (!success) {
    //   Notification.error({
    //     title: code,
    //     content: message || 'Error',
    //     duration: 3 * 1000,
    //   });
    //   return Promise.reject(new Error(message || 'Error'));
    // }
    return data;
  },
  (error: AxiosError<HttpResponse>) => {
    const { response } = error;
    if (response) {
      const { code, message } = response.data;
      Notification.error({
        title: code,
        content: message || 'Error',
        duration: 3 * 1000,
      });
      //   Notification.error({
      //     title: message,
      //     content: codeMessage[code] || 'Error',
      //     duration: 3 * 1000,
      //   });
      return Promise.reject(error);
    }
    return Promise.reject(error);
    // if (response && response.status) {
    //   const { status, statusText } = response;
    //   const errorText = codeMessage[status] || statusText;
    //   Notification.error({
    //     title: `${status}: ${statusText}`,
    //     content: errorText,
    //     duration: 5 * 1000,
    //   });
    //   return Promise.reject(error);
    // }
  },
);

export default instance;
