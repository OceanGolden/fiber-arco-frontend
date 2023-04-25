import { Card, Divider, Drawer, Form, Select } from '@arco-design/web-react';

import { useRolesAll } from '@/api/system/role/query';
import { useStaffRoleMutation } from '@/api/system/staff/query';
import type { StaffRecord } from '@/api/system/staff/type';
import { SystemStatusEnum } from '@/common/constants';

const MutationRoleDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<StaffRecord> }) => {
  const [form] = Form.useForm();
  const mutation = useStaffRoleMutation();

  const { data: roleOptions, isLoading: roleLoading } = useRolesAll({}, { enabled: !!props.visible });

  const afterOpen = () => {
    form.setFieldsValue({
      role_ids: props.formRecord.role_ids,
    });
  };
  const afterClose = () => {
    form.resetFields();
  };

  const onOk = () => {
    form.validate().then((values) => {
      mutation.mutate(
        { staff_id: props.formRecord.id, ...values },
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
      title={'分配角色'}
    >
      <Form form={form} scrollToFirstError layout={'vertical'}>
        <Divider orientation='left'>{`${props.formRecord.name}  分配角色`}</Divider>
        <Card bordered={false}>
          <Form.Item label='角色' field='role_ids' rules={[{ required: true, message: '角色为必选项' }]}>
            <Select
              allowClear
              unmountOnExit
              mode='multiple'
              showSearch
              placeholder='请选择角色'
              loading={roleLoading}
              filterOption={(inputValue, option) => option.props.children.indexOf(inputValue) >= 0}
            >
              {roleOptions?.map((item) => (
                <Select.Option key={item.id} value={item.id} disabled={item.status != SystemStatusEnum.Enable}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Form>
    </Drawer>
  );
};

export default MutationRoleDrawer;
