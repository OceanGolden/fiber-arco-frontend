import { Button, Space } from '@arco-design/web-react';

import { IconPlus } from '@arco-design/web-react/icon';

const OperationButtons = (props: { onAdd: () => void }) => {
  return (
    <div className='flex justify-between mb-6'>
      <Space>
        <Button title='新建' type='primary' icon={<IconPlus />} onClick={props.onAdd}>
          新建
        </Button>
        {/* {props.onImport && <Button onClick={props.onImport}>批量导入</Button>} */}
      </Space>
      {/* <Space>
        {props.onDownload && (
          <Button icon={<IconDownload />} onClick={props.onDownload}>
            下载
          </Button>
        )}
      </Space> */}
    </div>
  );
};

export default OperationButtons;
