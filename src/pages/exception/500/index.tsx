import { Button, Result } from '@arco-design/web-react';

const Exception500 = () => {
  return (
    <div className='flex items-center bg-arco-bg-1 h-full '>
      <Result
        status='500'
        subTitle={'抱歉，服务器出了点问题～'}
        extra={
          <Button key='back' type='primary'>
            {'返回'}
          </Button>
        }
      />
    </div>
  );
};

export default Exception500;