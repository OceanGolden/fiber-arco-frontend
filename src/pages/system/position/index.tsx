import MutationDrawer from './components/mutation-drawer';
import OperationButtons from './components/operation-buttons';
import SearchForm from './components/search-form';
import { CalCurrent } from '@/utils/paginator';
import { Card, PaginationProps, Table } from '@arco-design/web-react';
import { getColumns } from './columns';
import { PaginationEnum } from '@/common/constants';
import { usePositionDelete, usePositions } from '@/api/system/position/query';
import { useState } from 'react';
import type { PositionParams, PositionRecord } from '@/api/system/position/type';

const Position = () => {
  const [formParams, setFormParams] = useState<Partial<PositionParams>>({
    current: PaginationEnum.Current,
    pageSize: PaginationEnum.PageSize,
  });
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<PositionRecord>>({});
  const { data, isLoading } = usePositions(formParams);
  const { confirmRemove } = usePositionDelete();

  // 分页操作
  const onChangeTable = (pagination: Partial<PaginationProps>) => {
    setFormParams({
      ...formParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  //表格操作列回调
  const operationCallback = async (record: Partial<PositionRecord>, type: string) => {
    if (type === 'edit') {
      setCurrentRecord(record);
      setDrawerVisible(true);
    }
    if (type === 'delete') {
      confirmRemove(record, () => {
        const current = CalCurrent(data?.current, data?.pageSize, data?.total);
        setFormParams({ ...formParams, current });
        return data?.current === current;
      });
    }
  };
  const columns = getColumns<PositionRecord>(operationCallback);

  return (
    <Card bordered={false}>
      <SearchForm onSearch={(params) => setFormParams(params)} />
      <OperationButtons onAdd={() => setDrawerVisible(true)} />
      <Table
        rowKey='id'
        loading={isLoading}
        columns={columns}
        data={data?.list}
        pagination={{
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          pageSize: data?.pageSize,
          current: data?.current,
          total: data?.total,
        }}
        onChange={onChangeTable}
      />
      <MutationDrawer
        visible={drawerVisible}
        onCancel={() => {
          setDrawerVisible(false);
          setCurrentRecord({});
        }}
        formRecord={currentRecord}
      />
    </Card>
  );
};

export default Position;
