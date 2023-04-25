import { Layout } from '@arco-design/web-react';
import Content from './components/content';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';

const PageLayout = () => {
  return (
    <Layout className='h-screen w-screen flex flex-col'>
      <Navbar />
      <Layout hasSider className='flex flex-row overflow-hidden'>
        <Sidebar />
        <Layout className='flex flex-col'>
          <Content />
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
