import useDictOptions from '@/hooks/useDictOptions';
import {
    Card,
    Drawer,
    Form,
    Input,
    InputNumber,
    Select,
    TreeSelect
    } from '@arco-design/web-react';
import { OrganizationRecord } from '@/api/system/organization/type';
import { SystemTreeRoot } from '@/common/constants';
import { useOrganizationMutation, useOrganizations } from '@/api/system/organization/query';
import { useState } from 'react';

const MutationDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<OrganizationRecord> }) => {
  const [title, setTitle] = useState('');
  const [form] = Form.useForm();
  const [options, isLoading] = useDictOptions('system_status');
  const { treeData, isLoading: treeLoading } = useOrganizations({}, { enabled: !!props.visible });

  const mutation = useOrganizationMutation(title);

  const afterOpen = () => {
    form.setFieldsValue({
      parent_id: props.formRecord.parent_id || SystemTreeRoot.Root,
      name: props.formRecord.name,
      code: props.formRecord.code,
      sort: props.formRecord.sort || 1000,
      status: props.formRecord.status || options[0].value,
      remark: props.formRecord.remark,
    });
    props.formRecord.id ? setTitle(`编辑 ${props.formRecord.name}`) : setTitle('新增组织');
  };
  const afterClose = () => {
    form.resetFields();
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
          <Form.Item
            label='上级组织'
            field='parent_id'
            hidden={!!props.formRecord.id}
            rules={[{ required: true, message: '上级组织为必选项' }]}
          >
            <TreeSelect
              allowClear
              placeholder='请选择上级组织'
              loading={treeLoading}
              treeData={treeData}
              fieldNames={{ key: 'id', title: 'name' }}
              showSearch={true}
              filterTreeNode={(input, treeNode) => {
                return treeNode.props.title.indexOf(input) > -1;
              }}
            />
          </Form.Item>
          <Form.Item
            label='组织名称'
            field='name'
            rules={[
              { required: true, message: '名称为必填选项' },
              { minLength: 2, message: '名称最小需要2个字符' },
              { maxLength: 32, message: '名称最多为32个字符' },
            ]}
          >
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item
            label='组织编码'
            field='code'
            rules={[
              { required: true, message: '编码为必填选项' },
              { minLength: 2, message: '编码最小需要2个字符' },
              { maxLength: 32, message: '编码最多为64个字符' },
            ]}
          >
            <Input placeholder='请输入编码' />
          </Form.Item>
          <Form.Item label='状态' field='status' rules={[{ required: true, message: '状态为必选项' }]}>
            <Select placeholder='请选择状态' allowClear options={options} loading={isLoading} />
          </Form.Item>
          <Form.Item label='排序' field='sort' rules={[{ required: true, message: '排序为必填选项' }]}>
            <InputNumber placeholder='请输入排序数值' />
          </Form.Item>
          <Form.Item label='备注' field='remark'>
            <Input.TextArea placeholder='请输入备注' />
          </Form.Item>
        </Card>
      </Form>
    </Drawer>
  );
};

export default MutationDrawer;
