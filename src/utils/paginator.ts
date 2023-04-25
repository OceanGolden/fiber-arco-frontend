import { PaginationEnum } from '@/common/constants';

export const CalCurrent = (
  current: number = PaginationEnum.Current,
  pageSize: number = PaginationEnum.PageSize,
  total: number = PaginationEnum.Total,
) => {
  const totalPage = Math.ceil((total - 1) / pageSize); // 总页数
  current = current > totalPage ? totalPage : current;
  current = current < 1 ? 1 : current;
  return current;
};
