import * as StaffService from './service';

import { Message, Modal } from '@arco-design/web-react';
import type { StaffParams, StaffRecord, StaffRequest, StaffRoleRequest } from './type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PageResponse } from '@/common/types';

export enum QueryKeys {
  query = 'staff-query',
}

export const useStaffs = (params: Partial<StaffParams>) => {
  return useQuery<PageResponse<StaffRecord>>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => StaffService.query(params),
    keepPreviousData: true,
  });
};

export const useStaffMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<StaffRequest>) => {
      const submit = req.id ? StaffService.update : StaffService.create;
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

export const useStaffRoleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (req: StaffRoleRequest) => {
        const submit = StaffService.assignRole;
        return submit(req);
      },
      onMutate: () => {
        Message.loading(`正在分配角色数据...`);
      },
      onSuccess: () => {
        Message.clear();
        Message.success(`角色分配成功`);
        queryClient.invalidateQueries([QueryKeys.query]);
      },
      onError: () => {
        Message.clear();
        Message.error(`角色分配失败`);
      },
    });
  };
  

export const useStaffDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<StaffRequest>) => {
      return StaffService.remove(req);
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

  const confirmRemove = (record: Partial<StaffRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选用户?',
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
