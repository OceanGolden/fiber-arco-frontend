import * as DictionaryService from './service';
import { Message, Modal } from '@arco-design/web-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PageResponse } from '@/common/types';
import type { DictionaryParams, DictionaryRecord, DictionaryRequest } from './type';

export enum QueryKeys {
  query = 'dictionary-query',
}

export const useDictionaries = (params: Partial<DictionaryParams>) => {
  return useQuery<PageResponse<DictionaryRecord>>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => DictionaryService.query(params),
    keepPreviousData: true,
  });
};

export const useDictionaryMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<DictionaryRequest>) => {
      const submit = !!req.id ? DictionaryService.update : DictionaryService.create;
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

export const useDictionaryDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<DictionaryRequest>) => {
      return DictionaryService.remove(req);
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

  const confirmRemove = (record: Partial<DictionaryRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选字典?',
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
