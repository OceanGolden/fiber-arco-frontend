import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import { MenuRecord } from '@/api/system/menu/type';
import { TokenEnum } from '@/common/constants';
import { LazyComponent } from '@/components/lazy-component';
import Login from '@/pages/auth/login';
import Storage from '@/utils/storage';

const Appraisal = ({ children }: any) => {
  const access = Storage.get(TokenEnum.Access);
  return access ? children : <Navigate to='/login' />;
};
// 权限列表 和 导航菜单 得出路由表 element暂用字符串表示 后面渲染前再映射
export const handelFilterRouter = (permissions: string[], menus: MenuRecord[], routes: RouteObject[] = []) => {
  for (const menu of menus) {
    if (menu.permission) {
      let index = permissions.findIndex((item) => item === menu.permission) + 1;
      if (!menu.children) {
        if (index) {
          const obj = {
            path: menu.path,
            element: menu.component,
          };
          routes.push(obj);
        }
      } else {
        handelFilterRouter(permissions, menu.children, routes);
      }
    }
  }
  return routes;
};

// 返回最终路由表
export const handelEnd = (routes: any) => {
  defaultRoutes[1].children = defaultRoutes[1].children?.concat(routes);
  return defaultRoutes;
};

const defaultRoutes: RouteObject[] = [
  {
    id: 'login',
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Appraisal>{LazyComponent('sand-box')}</Appraisal>,
    children: [
      {
        path: '',
        element: <Navigate to='home' />,
      },
      {
        path: '*',
        element: <div>403</div>,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export const handelFilterElement = (routes: any) => {
  return routes.map((route: any) => {
    route.element = LazyComponent(route.element);
    return route;
  });
};

const router = createBrowserRouter(defaultRoutes);

export default router;
