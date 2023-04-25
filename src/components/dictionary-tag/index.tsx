import useDictOptions from '@/hooks/useDictOptions';
import { Tag } from '@arco-design/web-react';
import { useMemo } from 'react';

const DictionaryTag = (props: {
  code: string;
  value: string;
  bordered?: boolean;
}) => {
  const [options] = useDictOptions(props.code);
  const status = useMemo(
    () => options?.find((item) => props.value === item.value),
    [options, props.value]
  );

  // const status = options.find((item) => props.value === item.value);

  return (
    <Tag key={status?.value} color={status?.color} bordered={props.bordered}>
      {status?.label}
    </Tag>
  );
};

export default DictionaryTag;
