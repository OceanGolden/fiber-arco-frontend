import * as MenuService from './service';

import { SystemStatusEnum, SystemTreeRoot } from '@/common/constants';
import { Message, Modal } from '@arco-design/web-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { MenuParams, MenuRecord, MenuRequest } from './type';

import type { UseQueryOptions } from '@tanstack/react-query';

export enum QueryKeys {
  query = 'menu-query',
}

export const useMenus = (params: Partial<MenuParams>, options?: UseQueryOptions<MenuRecord[]>) => {
  const queryInfo = useQuery<MenuRecord[]>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => MenuService.queryTreeAll(params),
    ...options,
  });
  return {
    ...queryInfo,
    treeSelectData: [
      { id: SystemTreeRoot.Root as string, name: '根目录', status: SystemStatusEnum.Enable as string } as MenuRecord,
    ].concat(queryInfo.data || []),
  };
};

export const useMenusTree = (token: string, options?: UseQueryOptions<MenuRecord[]>) => {
  const queryInfo = useQuery<MenuRecord[]>({
    queryKey: [QueryKeys.query, { token }],
    queryFn: () => MenuService.queryTree(),
    ...options,
  });
  return {
    ...queryInfo,
  };
};

export const useMenuMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<MenuRequest>) => {
      const submit = req.id ? MenuService.update : MenuService.create;
      return submit(req);
    },
    onMutate: () => {
      Message.loading(`正在${title}数据...`);
    },
    onSuccess: () => {
      Message.clear();
      Message.success(`${title}成功`);
      queryClient.invalidateQueries([QueryKeys.query]);
    },
    onError: () => {
      Message.clear();
      Message.error(`${title}失败`);
    },
  });
};

export const useMenuDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<MenuRequest>) => {
      return MenuService.remove(req);
    },
    {
      onMutate: (variables) => {
        Message.loading(`正在删除${variables.name}数据...`);
      },
      onSuccess: (_, variables) => {
        Message.clear();
        Message.success(`${variables.name}删除成功`);
        queryClient.invalidateQueries([QueryKeys.query]);
      },
      onError: (_, variables) => {
        Message.clear();
        Message.error(`${variables.name}删除失败`);
      },
    },
  );

  const confirmRemove = (record: Partial<MenuRecord>) => {
    Modal.confirm({
      title: '确认删除当前所选菜单?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () => deleteMutation.mutate(record),
    });
  };

  return { deleteMutation, confirmRemove };
};
