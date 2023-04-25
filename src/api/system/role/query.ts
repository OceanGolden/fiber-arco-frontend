import * as RoleService from './service';
import { Message, Modal } from '@arco-design/web-react';
import { OrganizationRecord } from '../organization/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PageResponse } from '@/common/types';
import type { RoleMenuParams, RoleMenuRecord, RoleMenuRequest, RoleParams, RoleRecord, RoleRequest } from './type';
import type { UseQueryOptions } from '@tanstack/react-query';

export enum QueryKeys {
  query = 'role-query',
}

export const useRoles = (params: Partial<RoleParams>) => {
  return useQuery<PageResponse<RoleRecord>>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => RoleService.query(params),
    keepPreviousData: true,
  });
};

export const useRolesAll = (params: Partial<RoleParams>, options?: UseQueryOptions<RoleRecord[]>) => {
  return useQuery<RoleRecord[]>({
    queryKey: [QueryKeys.query, 'all', params],
    queryFn: () => RoleService.queryAll(params),
    ...options,
  });
};

export const useGrantMenus = (params: RoleMenuParams, options?: UseQueryOptions<RoleMenuRecord[]>) => {
  return useQuery<RoleMenuRecord[]>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => RoleService.queryMenus(params),
    ...options,
  });
};

export const useRoleMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<RoleRequest>) => {
      const submit = req.id ? RoleService.update : RoleService.create;
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

export const useRoleMenuMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<RoleMenuRequest>) => {
      const submit = RoleService.grantMenus;
      return submit(req);
    },
    onMutate: () => {
      Message.loading(`正在给角色授权菜单数据...`);
    },
    onSuccess: (_data, variables, _context) => {
      Message.clear();
      Message.success(`授权成功`);
      queryClient.invalidateQueries([QueryKeys.query, { role_id: variables.role_id }]);
    },
    onError: () => {
      Message.clear();
      Message.error(`授权失败`);
    },
  });
};

export const useRoleDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<RoleRequest>) => {
      return RoleService.remove(req);
    },
    onMutate: (variables) => {
      Message.loading(`正在删除${variables.name}数据...`);
    },
    onSuccess: (_, variables) => {
      Message.clear();
      Message.success(`${variables.name}删除成功`);
    },
    onError: (_, variables) => {
      Message.clear();
      Message.error(`${variables.name}删除失败`);
    },
  });

  const confirmRemove = (record: Partial<RoleRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选角色?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () =>
        deleteMutation.mutateAsync(record, {
          onSuccess: () => {
            if (onSuccess()) {
              queryClient.invalidateQueries([QueryKeys.query]);
            }
          },
        }),
    });
  };

  return { deleteMutation, confirmRemove };
};
