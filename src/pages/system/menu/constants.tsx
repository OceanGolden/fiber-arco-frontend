import { Button, Dropdown, Menu, TableColumnProps } from '@arco-design/web-react';
import { IconDelete, IconDown } from '@arco-design/web-react/icon';

import DictionaryTag from '@/components/dictionary-tag';
import DynamicIcon from '@/components/dynamic-icon';

export function getColumns<T>(callback: (record: Partial<T>, type: string) => Promise<void>): TableColumnProps[] {
  return [
    { title: '名称', dataIndex: 'name' },
    {
      title: '类型',
      dataIndex: 'type',
      width: '10%',
      render: (value) => <DictionaryTag code='menu_type' value={value} bordered />,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: '10%',
      render: (value) => <DynamicIcon icon={value} />,
    },
    { title: '路径', dataIndex: 'path', width: '20%' },
    // { title: '权限', dataIndex: 'permission', width: '15%' },
    { title: '方法', dataIndex: 'method' },
    {
      title: '状态',
      dataIndex: 'status',
      width: '10%',
      render: (value) => <DictionaryTag code='system_status' value={value} />,
    },
    // { title: '备注', dataIndex: 'remark', ellipsis: true },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 168,
      fixed: 'right',
      render: (_, record: Partial<T>) => (
        <Dropdown.Button
          onClick={() => callback(record, 'edit')}
          icon={<IconDown />}
          trigger={['click']}
          droplist={
            <Menu onClickMenuItem={(key) => callback(record, key)}>
              <Menu.Item key='delete'>
                <Button type='text' status='danger' icon={<IconDelete />}>
                  删除
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          编辑
        </Dropdown.Button>
      ),
    },
  ];
}
