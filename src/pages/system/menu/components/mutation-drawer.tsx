import { useMenuMutation, useMenus } from '@/api/system/menu/query';
import { SystemMenuEnum, SystemStatusEnum, SystemTreeRoot } from '@/common/constants';
import { Card, Drawer, Form, Grid, Input, InputNumber, Radio, Select, Tree, TreeSelect } from '@arco-design/web-react';

import type { MenuRecord } from '@/api/system/menu/type';
import useDictOptions from '@/hooks/useDictOptions';
import { useState } from 'react';

const renderTree = (treeList: MenuRecord[] | undefined) => {
  if (!treeList) {
    return null;
  }
  return treeList.map((item) => {
    if (item.children?.length) {
      return (
        <Tree.Node key={item.id} title={item.name}>
          {renderTree(item.children)}
        </Tree.Node>
      );
    }
    return <Tree.Node key={item.id} title={item.name} />;
  });
};

const MutationDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<MenuRecord> }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [methodOptions, loadingMethod] = useDictOptions('menu_method');
  const [statusOptions, loadingStatus] = useDictOptions('system_status');
  const [typeOptions] = useDictOptions('menu_type');

  const { isLoading, treeSelectData } = useMenus(
    {},
    {
      enabled: !!props.visible,
    },
  );

  const mutation = useMenuMutation(title);

  const afterOpen = () => {
    form.setFieldsValue({
      id: props.formRecord.id,
      parent_id: props.formRecord.parent_id || SystemTreeRoot.Root,
      name: props.formRecord.name,
      type: props.formRecord.type || typeOptions.find((el) => el != undefined)?.value,
      icon: props.formRecord.icon,
      permission: props.formRecord.permission,
      path: props.formRecord.path,
      component: props.formRecord.component,
      method: props.formRecord.method,
      link: props.formRecord.link,
      visible: props.formRecord.visible,
      redirect: props.formRecord.redirect,
      sort: props.formRecord.sort || 1000,
      status: props.formRecord.status || SystemStatusEnum.Enable,
      remark: props.formRecord.remark,
    });
    props.formRecord.id ? setTitle(`编辑 ${props.formRecord.name}`) : setTitle('新增菜单');
    props.formRecord.type ? setType(props.formRecord.type) : setType(SystemMenuEnum.Catalog);
  };
  const afterClose = () => {
    form.resetFields();
    setType(SystemMenuEnum.Catalog);
  };

  const onOk = () => {
    form.validate().then((values) => {
      mutation.mutate(
        { ...props.formRecord, ...values },
        {
          onSuccess: () => {
            props.onCancel();
          },
        },
      );
    });
  };

  return (
    <Drawer
      width='33.3%'
      unmountOnExit
      visible={props.visible}
      onCancel={props.onCancel}
      afterOpen={afterOpen}
      afterClose={afterClose}
      onOk={onOk}
      confirmLoading={mutation.isLoading}
      title={title}
    >
      <Form form={form} scrollToFirstError layout={'vertical'}>
        <Card bordered={false}>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item
                label='类型'
                field='type'
                rules={[{ required: true, message: '类型为必选项' }]}
                hidden={!!props.formRecord.id}
              >
                <Radio.Group options={typeOptions} type='button' name='type' onChange={(value) => setType(value)} />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col>
              <Form.Item
                label='上级菜单'
                field='parent_id'
                rules={[{ required: true, message: '上级菜单为必选项' }]}
                hidden={!!props.formRecord.id}
              >
                <TreeSelect
                  allowClear
                  placeholder='请选择上级菜单'
                  loading={isLoading}
                  value={props.formRecord.parent_id}
                  treeProps={{
                    autoExpandParent: false,
                  }}
                  showSearch={true}
                  filterTreeNode={(input, treeNode) => {
                    return treeNode.props.title.indexOf(input) > -1;
                  }}
                >
                  {renderTree(treeSelectData)}
                </TreeSelect>
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item
                label='名称'
                field='name'
                rules={[
                  { required: true, message: '名称为必填选项' },
                  { minLength: 2, message: '名称最小需要2个字符' },
                  { maxLength: 32, message: '名称最多为32个字符' },
                ]}
              >
                <Input placeholder='请输入名称' />
              </Form.Item>
            </Grid.Col>
            {type !== SystemMenuEnum.Button && (
              <Grid.Col span={12}>
                <Form.Item label='图标' field='icon' rules={[]}>
                  <Input placeholder='选择图标' />
                </Form.Item>
              </Grid.Col>
            )}
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item label='路径' field='path' rules={[]}>
                <Input placeholder='输入路径' />
              </Form.Item>
            </Grid.Col>
            {type === SystemMenuEnum.Menu && (
              <Grid.Col span={12}>
                <Form.Item label='组件' field='component' rules={[]}>
                  <Input placeholder='输入前端组件' />
                </Form.Item>
              </Grid.Col>
            )}
          </Grid.Row>
          {/* {type == SystemMenuEnum.Button && (
            <Grid.Row gutter={24}>
              <Grid.Col span={24}>
                <Form.Item label='权限标识' field='permission' rules={[]}>
                  <Input placeholder='输入权限标识' />
                </Form.Item>
              </Grid.Col>
            </Grid.Row>
          )} */}
          {type == SystemMenuEnum.Button && (
            <Grid.Row gutter={24}>
              <Grid.Col span={24}>
                <Form.Item label='方法' field='method' rules={[]}>
                  <Select placeholder='请选择方法' allowClear options={methodOptions} loading={loadingMethod} />
                </Form.Item>
              </Grid.Col>
            </Grid.Row>
          )}
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item label='状态' field='status' rules={[{ required: true, message: '状态为必选项' }]}>
                <Select placeholder='请选择状态' allowClear options={statusOptions} loading={loadingStatus} />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label='排序' field='sort' rules={[{ required: true, message: '排序为必填选项' }]}>
                <InputNumber placeholder='请输入排序数值' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={24}>
              <Form.Item label='备注' field='remark'>
                <Input.TextArea placeholder='请输入备注' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
      </Form>
    </Drawer>
  );
};

export default MutationDrawer;
