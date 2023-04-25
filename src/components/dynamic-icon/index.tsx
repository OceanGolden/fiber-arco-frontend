import * as ArcoIcon from '@arco-design/web-react/icon';

const DynamicIcon = (props: { icon: string }) => {
  const IconComponent = ArcoIcon && (ArcoIcon as any)[props.icon];

  if (!IconComponent) {
    return <div className='w-3 inline-block text-lg'></div>;
  }

  return <IconComponent className='text-lg align-text-bottom' />;
};

export default DynamicIcon;
