import useOptions from '@/hooks/useDictOptions';
import {
  Button,
  Form,
  Grid,
  Input,
  Select
  } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { OrganizationParams } from '@/api/system/organization/type';

const SearchForm = (props: { onSearch: (values: Partial<OrganizationParams>) => void }) => {
  const [form] = Form.useForm();
  const [options, isLoading] = useOptions('system_status');
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
      <Form form={form} labelAlign='left' labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} className='mr-4'>
        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <Form.Item label='名称' field='name'>
              <Input allowClear placeholder='请输入名称' />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item label='编码' field='code'>
              <Input allowClear placeholder='请输入编码' />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={24}>
          <Grid.Col span={12}>
            <Form.Item label='备注' field='remark'>
              <Input allowClear placeholder='请输入备注' />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item label='状态' field='status'>
              <Select allowClear placeholder='请选择状态' options={options} loading={isLoading} />
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
