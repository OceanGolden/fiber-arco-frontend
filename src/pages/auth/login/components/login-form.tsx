import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/api/auth/query';
import { LoginRequest } from '@/api/auth/type';
import { accessAtomWithLocalStorage, refreshAtomWithLocalStorage } from '@/atoms/token_atom';
import { Button, Checkbox, Form, Input } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';

const LoginForm = () => {
  const [form] = Form.useForm();
  const setAccessToken = useSetAtom(accessAtomWithLocalStorage);
  const setRefreshToken = useSetAtom(refreshAtomWithLocalStorage);
  const loginMutation = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = () => {
    form.validate().then((values: LoginRequest) => {
      loginMutation.mutate(values, {
        onSuccess: (data) => {
          setAccessToken(data.access);
          setRefreshToken(data.refresh);
          //   if (rememberPassword) {
          //     setLoginReq(variables);
          //   } else {
          //     setLoginReq(RESET);
          //   }
          navigate('/home', { replace: true });
        },
        onSettled: () => {
          form.resetFields();
        },
      });
    });
  };

  return (
    <Form
      className='w-full p-8 max-w-1/2'
      size={'large'}
      layout='vertical'
      form={form}
      name='login-form'
      onSubmit={onSubmit}
      autoComplete='off'
      initialValues={{ username: '', password: '', remember: false }}
    >
      <p className='text-shadow-sm text-5xl font-bold mb-16'>欢迎回来</p>
      <Form.Item field='username' normalize={(v) => v.trim()} rules={[{ required: true, message: '请输入用户名称!' }]}>
        <Input prefix={<IconUser />} placeholder='Username' />
      </Form.Item>
      <Form.Item field='password' normalize={(v) => v.trim()} rules={[{ required: true, message: '请输入用户密码!' }]}>
        <Input.Password prefix={<IconLock />} placeholder='Password ' />
      </Form.Item>
      <Form.Item field='remember'>
        <Checkbox>自动登录</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' long loading={loginMutation.isLoading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
