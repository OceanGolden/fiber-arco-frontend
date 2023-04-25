import { Button, Dropdown, Menu, Space, TableColumnProps } from '@arco-design/web-react';
import { IconDelete, IconDown, IconList } from '@arco-design/web-react/icon';

import DictionaryTag from '@/components/dictionary-tag';

export function getColumns<T>(callback: (record: Partial<T>, type: string) => Promise<void>): TableColumnProps[] {
  return [
    { title: '用户名称', dataIndex: 'username', width: '15%' },
    { title: '姓名', dataIndex: 'name', width: '15%' },
    // { title: '电话号码', dataIndex: 'mobile', width: '15%' },
    {
      title: '性别',
      dataIndex: 'gender',
      width: '10%',
      render: (value) => <DictionaryTag code='staff_gender' value={value} />,
    },
    { title: '备注', dataIndex: 'remark', ellipsis: true },
    {
      title: '在职状态',
      dataIndex: 'work_status',
      width: '15%',
      render: (value) => <DictionaryTag code='staff_work_status' value={value} />,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: '25%',
      fixed: 'right',
      render: (_, record: Partial<T>) => (
        <Space>
          <Button.Group>
            <Button title='分配角色' onClick={() => callback(record, 'assign')} icon={<IconList />} />
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
          </Button.Group>
        </Space>
      ),
    },
  ];
}
