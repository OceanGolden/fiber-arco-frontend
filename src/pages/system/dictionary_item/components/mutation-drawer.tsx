import useDictOptions from '@/hooks/useDictOptions';
import {
  Card,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select
  } from '@arco-design/web-react';
import { useDictionaryItemMutation } from '@/api/system/dictionary_item/query';
import { useState } from 'react';
import type { DictionaryItemRecord } from '@/api/system/dictionary_item/type';

const colorOptions = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'magenta',
];

const MutationDrawer = (props: {
  visible: boolean;
  onCancel: () => void;
  formRecord: Partial<DictionaryItemRecord>;
}) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const mutation = useDictionaryItemMutation(title);
  const [options, isLoading] = useDictOptions('system_status');

  const afterOpen = () => {
    form.setFieldsValue(props.formRecord);
    props.formRecord.id ? setTitle(`编辑 ${props.formRecord.label}`) : setTitle('新增字典选项');
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
            label='选项名称'
            field='label'
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
            label='选项值'
            field='value'
            rules={[
              { required: true, message: '选项值为必填选项' },
              { minLength: 2, message: '选项值最小需要2个字符' },
              { maxLength: 32, message: '选项值最多为32个字符' },
            ]}
          >
            <Input placeholder='请输入选项值' />
          </Form.Item>
          <Form.Item
            label='颜色'
            field='color'
            rules={[
              { required: true, message: '颜色为必填选项' },
              { minLength: 2, message: '颜色最小需要2个字符' },
              { maxLength: 32, message: '颜色最多为32个字符' },
            ]}
          >
            <Select placeholder='请选择颜色' allowClear>
              {colorOptions.map((color) => (
                <Select.Option key={color} value={color} style={{ backgroundColor: `${color}` }}>
                  {color}
                </Select.Option>
              ))}
            </Select>
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
