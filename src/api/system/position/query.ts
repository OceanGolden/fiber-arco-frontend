import * as PositionService from './service';
import { Message, Modal } from '@arco-design/web-react';
import { PageResponse } from '@/common/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { PositionParams, PositionRecord, PositionRequest } from './type';

export enum QueryKeys {
  query = 'position-query',
}

export const usePositions = (params: Partial<PositionParams>) => {
  return useQuery({
    queryKey: [QueryKeys.query, params],
    queryFn: () => PositionService.query(params),
    keepPreviousData: true,
  });
};

export const usePositionsAll = (params: Partial<PositionParams>, options?: UseQueryOptions<PositionRecord[]>) => {
  return useQuery({
    queryKey: [QueryKeys.query, 'all', params],
    queryFn: () => PositionService.queryAll(params),
    ...options,
  });
};

export const usePositionMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<PositionRequest>) => {
      const submit = !!req.id ? PositionService.update : PositionService.create;
      return submit(req);
    },
    onMutate: () => {
      Message.loading(`正在${title}数据...`);
    },
    onSuccess: () => {
      Message.clear();
      Message.success(`${title}成功！`);
      queryClient.invalidateQueries([QueryKeys.query]);
    },
    onError: () => {
      Message.clear();
      Message.error(`${title}失败！`);
    },
  });
};

export const usePositionDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<PositionRequest>) => {
      return PositionService.remove(req);
    },
    onMutate: (variables) => {
      Message.loading(`正在删除${variables.name}数据...`);
    },
    onSuccess: (_, variables) => {
      Message.clear();
      Message.success(`${variables.name}删除成功！`);
    },
    onError: (_, variables) => {
      Message.clear();
      Message.error(`${variables.name}删除失败！`);
    },
  });

  const confirmRemove = (record: Partial<PositionRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选职位?',
      content: `删除后，${record.name}将被清空，且无法恢复！`,
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
