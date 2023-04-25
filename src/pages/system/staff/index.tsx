import {
  Card,
  Grid,
  PaginationProps,
  Table,
  Tree
} from '@arco-design/web-react';
import { StaffParams, StaffRecord } from '@/api/system/staff/type';
import { useStaffDelete, useStaffs } from '@/api/system/staff/query';

import { CalCurrent } from '@/utils/paginator';
import MutationDrawer from './components/mutation-drawer';
import MutationRoleDrawer from './components/mutation-role-drawer';
import OperationButtons from './components/operation-buttons';
import { PaginationEnum } from '@/common/constants';
import SearchForm from './components/search-form';
import { getColumns } from './columns';
import { useOrganizations } from '@/api/system/organization/query';
import { useState } from 'react';

const Staff = () => {
  const [formParams, setFormParams] = useState<Partial<StaffParams>>({
    current: PaginationEnum.Current,
    pageSize: PaginationEnum.PageSize,
  });
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [roleDrawerVisible, setRoleDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<StaffRecord>>({});
  const { data: organizationTree, isLoading: organizationLoading } = useOrganizations({});
  const { data, isLoading } = useStaffs(formParams);
  const { confirmRemove } = useStaffDelete();

  // 分页操作
  const onChangeTable = (pagination: Partial<PaginationProps>) => {
    setFormParams({
      ...formParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  //表格操作列回调
  const operationCallback = async (record: Partial<StaffRecord>, type: string) => {
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
    if (type === 'assign') {
        setCurrentRecord(record);
        setRoleDrawerVisible(true);
      }
  };
  const columns = getColumns<StaffRecord>(operationCallback);
  return (
    <Card>
      <Grid.Row gutter={24}>
        <Grid.Col span={4}>
          {!organizationLoading && (
            <Tree
              treeData={organizationTree}
              fieldNames={{ key: 'id', title: 'name' }}
              onSelect={(selectKeys) => setFormParams({ ...formParams, organization_id: selectKeys.find((x) => x) })}
              selectedKeys={formParams.organization_id ? [formParams.organization_id] : []}
            />
          )}
        </Grid.Col>
        <Grid.Col span={20} className='border-0 border-l border-solid border-arco-border-2'>
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
        </Grid.Col>
      </Grid.Row>
      <MutationDrawer
            visible={drawerVisible}
            onCancel={() => {
              setDrawerVisible(false);
              setCurrentRecord({});
            }}
            formRecord={currentRecord}
          />
      <MutationRoleDrawer
        visible={roleDrawerVisible}
        onCancel={() => {
          setRoleDrawerVisible(false);
          setCurrentRecord({});
        }}
        formRecord={currentRecord}
      />
    </Card>
  );
};

export default Staff;
