import { Button, Result } from '@arco-design/web-react';

const Exception404 = () => {
  return (
    <div className='flex items-center bg-arco-bg-1 h-full '>
      <Result
        status='404'
        subTitle={'抱歉，页面不见了～'}
        extra={[
          <Button key='again' className='mr-6'>
            {'重试'}
          </Button>,
          <Button key='back' type='primary'>
            {'返回'}
          </Button>,
        ]}
      />
    </div>
  );
};

export default Exception404;