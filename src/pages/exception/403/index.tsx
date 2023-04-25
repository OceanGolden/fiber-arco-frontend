import { Button, Result } from '@arco-design/web-react';

const Exception403 = () => {
  return (
    <div className='flex items-center bg-arco-bg-1 h-full '>
      <Result
        status='403'
        subTitle={'对不起，您没有访问该资源的权限'}
        extra={
          <Button key='back' type='primary'>
            {'返回'}
          </Button>
        }
      />
    </div>
  );
};

export default Exception403;