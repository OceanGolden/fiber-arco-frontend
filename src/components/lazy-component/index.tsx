import { Spin } from '@arco-design/web-react';
import loadable from '@loadable/component';
import { createElement } from 'react';

export const LazyComponent = (componentPath: string) => {
  const [catalog, component] = componentPath.split('/');
  const asyncComponent = loadable(() => import(`../../pages/${catalog}/${component}/index.tsx`));
  return createElement(asyncComponent);
};

export const LoadablePage = loadable(
  (props: { path: string }) => import(`../../pages/${props.path.split('/')[0]}/${props.path.split('/')[1]}/index.tsx`),
  {
    fallback: <Spin />,
    cacheKey: (props) => props.path,
  },
);
