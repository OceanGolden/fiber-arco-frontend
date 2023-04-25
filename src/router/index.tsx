import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home';
import { LazyComponent } from '@/components/lazy-component';
import Login from '@/pages/auth/login';
import PageLayout from '@/layouts/page-layout';

export const defaultRoutes: RouteObject[] = [
  {
    id: 'login',
    path: '/login',
    element: <Login />,
  },
  {
    id: 'home',
    path: '/home/*',
    element: <PageLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    id: 'root',
    path: '/',
    element: <Navigate to='/login' />,
    // children: [
    //   {
    //     path: '*',
    //     element: <div>403</div>,
    //   },
    // ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export const r: RouteObject[] = [
  {
    path: '/dashboard',
    element: <PageLayout />,
    children: [
      { path: 'workplace', element: LazyComponent('dashboard/workplace') },
      { path: 'monitor', element: LazyComponent('dashboard/monitor') },
    ],
  },
  {
    path: '/system',
    element: <PageLayout />,
    children: [
      { path: 'staffs', element: LazyComponent('system/staff') },
      { path: 'roles', element: LazyComponent('system/role') },
      { path: 'menus', element: LazyComponent('system/menu') },
      { path: 'positions', element: LazyComponent('system/position') },
      { path: 'dictionaries', element: LazyComponent('system/dictionary') },
      { path: 'organizations', element: LazyComponent('system/organization') },
    ],
  },
];

const router = createBrowserRouter(defaultRoutes);

export default router;
