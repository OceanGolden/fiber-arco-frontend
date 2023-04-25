import useDictOptions from '@/hooks/useDictOptions';
import {
  Card,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select
  } from '@arco-design/web-react';
import { useDictionaryMutation } from '@/api/system/dictionary/query';
import { useState } from 'react';
import type { DictionaryRecord } from '@/api/system/dictionary/type';

const MutationDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<DictionaryRecord> }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const mutation = useDictionaryMutation(title);
  const [options, isLoading] = useDictOptions('system_status');

  const afterOpen = () => {
    form.setFieldsValue(props.formRecord);
    props.formRecord.id ? setTitle(`编辑 ${props.formRecord.name}`) : setTitle('新增字典类型');
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
          <Form.Item
            disabled={!!props.formRecord.id}
            label='编码'
            field='code'
            rules={[
              { required: true, message: '编码为必填选项' },
              { minLength: 2, message: '编码最小需要2个字符' },
              { maxLength: 32, message: '编码最多为32个字符' },
            ]}
          >
            <Input placeholder='请输入编码' />
          </Form.Item>
          <Form.Item
            label='状态'
            field='status'
            rules={[{ required: true, message: '状态为必选项' }]}
            initialValue={options[0]?.value}
          >
            <Select placeholder='请选择状态' allowClear options={options} loading={isLoading} />
          </Form.Item>
          <Form.Item
            label='排序'
            field='sort'
            initialValue={1000}
            rules={[{ required: true, message: '排序为必填选项' }]}
          >
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
