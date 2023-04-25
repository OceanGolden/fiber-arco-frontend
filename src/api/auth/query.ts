import * as AuthService from './service';

import { Message } from '@arco-design/web-react';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest } from './type';

export const useLoginMutation = (title: string = '登录') => {
  return useMutation(
    (req: Partial<LoginRequest>) => {
      const submit = AuthService.login;
      return submit(req);
    },
    {
      onMutate: () => {
        Message.loading(`正在${title}...`);
      },
      onSuccess: (data) => {
        Message.clear();
        Message.success(`${title}成功`);
      },
      onError: () => {
        Message.clear();
        Message.error(`${title}失败`);
      },
    },
  );
};
