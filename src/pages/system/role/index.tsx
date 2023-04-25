import MutationDrawer from './components/mutation-drawer';
import MutationMenuDrawer from './components/mutation-menu-drawer';
import OperationButtons from './components/operation-buttons';
import SearchForm from './components/search-form';
import { CalCurrent } from '@/utils/paginator';
import { Card, PaginationProps, Table } from '@arco-design/web-react';
import { getColumns } from './columns';
import { PaginationEnum } from '@/common/constants';
import { RoleParams, RoleRecord } from '@/api/system/role/type';
import { useRoleDelete, useRoles } from '@/api/system/role/query';
import { useState } from 'react';

const Role = () => {
  const [formParams, setFormParams] = useState<Partial<RoleParams>>({
    current: PaginationEnum.Current,
    pageSize: PaginationEnum.PageSize,
  });
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [menuDrawerVisible, setMenuDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<RoleRecord>>({});

  const { data, isLoading } = useRoles(formParams);
  const { confirmRemove } = useRoleDelete();

  // 分页操作
  const onChangeTable = (pagination: Partial<PaginationProps>) => {
    setFormParams({
      ...formParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  const operationCallback = async (record: Partial<RoleRecord>, type: string) => {
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
    if (type === 'grant') {
      setCurrentRecord(record);
      setMenuDrawerVisible(true);
    }
  };
  const columns = getColumns<RoleRecord>(operationCallback);
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
      <MutationMenuDrawer
        visible={menuDrawerVisible}
        onCancel={() => {
          setMenuDrawerVisible(false);
          setCurrentRecord({});
        }}
        formRecord={currentRecord}
      />
    </Card>
  );
};

export default Role;
