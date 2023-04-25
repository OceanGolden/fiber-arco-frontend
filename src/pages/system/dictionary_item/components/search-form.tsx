import { Button, Form, Grid, Input } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';

import type { DictionaryItemParams } from '@/api/system/dictionary_item/type';

const SearchForm = (props: { onSearch: (values: Partial<DictionaryItemParams>) => void }) => {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    const values = form.getFieldsValue();
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  return (
    <div className='flex border-0 border-b border-solid border-arco-border-1 mb-6'>
      <Form form={form} labelAlign='left' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} className='mr-4'>
        <Grid.Row gutter={24}>
          <Grid.Col span={22}>
            <Form.Item label='名称' field='label'>
              <Input allowClear placeholder='请输入名称' />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={24}>
          <Grid.Col span={22}>
            <Form.Item label='编码' field='value'>
              <Input allowClear placeholder='请输入编码' />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
      </Form>
      <div className='flex flex-col justify-between pl-6 mb-6 border-0 border-l border-solid border-arco-border-2'>
        <Button type='primary' icon={<IconSearch />} onClick={handleSubmit}>
          搜索
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          重置
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
