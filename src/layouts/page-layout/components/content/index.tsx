import { Navigate, Outlet } from 'react-router-dom';

import { Token } from '@/common/constants';
import Storage from '@/utils/storage';
import { Layout } from '@arco-design/web-react';

const Content = () => {
  const token = Storage.get(Token.Access);

  if (!token) {
    return <Navigate to='/' />;
  }

  return (
    <Layout.Content className='flex flex-col bg-arco-fill-2 transition duration-200'>
      {/* <Breadcrumb /> */}
      <div className='px-6 py-4 h-full'>
        <Outlet />
      </div>
    </Layout.Content>
  );
};

export default Content;
