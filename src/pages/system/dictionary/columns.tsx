import { Button, Dropdown, Menu, Space, TableColumnProps } from '@arco-design/web-react';
import { IconDelete, IconDown, IconList } from '@arco-design/web-react/icon';

import DictionaryTag from '@/components/dictionary-tag';

export function getColumns<T>(callback: (record: Partial<T>, type: string) => Promise<void>): TableColumnProps[] {
  return [
    { title: '名称', dataIndex: 'name' },
    { title: '编码', dataIndex: 'code' },
    { title: '备注', dataIndex: 'remark', ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value) => <DictionaryTag code='system_status' value={value} />,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 200,
      fixed: 'right',
      render: (_, record: Partial<T>) => (
        <Space>
          <Button.Group>
            <Button title='选项' onClick={() => callback(record, 'view')} icon={<IconList />} />
            <Dropdown.Button
              onClick={() => callback(record, 'edit')}
              icon={<IconDown />}
              trigger={['click']}
              droplist={
                <Menu onClickMenuItem={(key) => callback(record, key)}>
                  <Menu.Item key='delete'>
                    <Button title='删除' type='text' status='danger' icon={<IconDelete />}>
                      删除
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              编辑
            </Dropdown.Button>
          </Button.Group>
        </Space>
      ),
    },
  ];
}
