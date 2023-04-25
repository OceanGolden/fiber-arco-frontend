import MutationDrawer from './components/mutation-drawer';
import OperationButtons from './components/operation-buttons';
import SearchForm from './components/search-form';
import { Card, Table } from '@arco-design/web-react';
import { getColumns } from './constants';
import { useMenuDelete, useMenus } from '@/api/system/menu/query';
import { useState } from 'react';
import type { MenuParams, MenuRecord } from '@/api/system/menu/type';

const Menu = () => {
  const [formParams, setFormParams] = useState<Partial<MenuParams>>({});
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<MenuRecord>>({});

  const { data, isLoading } = useMenus(formParams);
  const { confirmRemove } = useMenuDelete();

  //表格操作列回调
  const operationCallback = async (record: Partial<MenuRecord>, type: string) => {
    if (type === 'edit') {
      setCurrentRecord(record);
      setDrawerVisible(true);
    }
    if (type === 'delete') {
      confirmRemove(record);
    }
  };
  const columns = getColumns<MenuRecord>(operationCallback);
  const onCancel = () => {
    setDrawerVisible(false);
    setCurrentRecord({});
  };
  return (
    <Card bordered={false}>
      <SearchForm onSearch={(params) => setFormParams(params)} />
      <OperationButtons onAdd={() => setDrawerVisible(true)} />
      <Table rowKey='id' loading={isLoading} columns={columns} data={data} pagination={false} />
      <MutationDrawer visible={drawerVisible} onCancel={onCancel} formRecord={currentRecord} />
    </Card>
  );
};

export default Menu;
