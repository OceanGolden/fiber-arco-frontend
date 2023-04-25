import { LazyComponent } from '@/components/lazy-component';

// 前端路由映射表
export const constantRouterComponents = {
  // 基础页面 layout 必须引入
  //   pagelayout: <PageLayout />,

  // 你需要动态引入的页面组件
  monitor: LazyComponent('dashboard/monitor'),
  workplace: LazyComponent('dashboard/workplace'),
  staff: LazyComponent('system/staff'),
  role: LazyComponent('system/role'),
  menu: LazyComponent('system/menu'),
  dictionary: LazyComponent('system/dictionary'),
  organization: LazyComponent('system/organization'),
  position: LazyComponent('system/position'),
};

// export const rootRoute: RouteObject[] = [
//   {
//     path: '/',
//     element: <Navigate to='/login' replace />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/home/*',
//     element: <PageLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//     ],
//   },
// ];

// export const generator = (routerMap, parent) => {
//   return routerMap.map((item) => {
//     const currentRouter = {
//       // 路由地址 动态拼接生成如 /dashboard/workplace
//       path: `${(parent && parent.path) || ''}/${item.key}`,
//       // 路由名称，建议唯一
//       name: item.name || item.key || '',
//       // 该路由对应页面的 组件
//       component: constantRouterComponents[item.component || item.key],
//       // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
//       meta: { title: item.title, icon: item.icon || undefined, permission: (item.key && [item.key]) || null },
//     };
//     // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
//     currentRouter.path = currentRouter.path.replace('//', '/');
//     // 重定向
//     item.redirect && (currentRouter.redirect = item.redirect);
//     // 是否有子菜单，并递归处理
//     if (item.children && item.children.length > 0) {
//       // Recursion
//       currentRouter.children = generator(item.children, currentRouter);
//     }
//     return currentRouter;
//   });
// };

// const router = createBrowserRouter(rootRoute);

// export default router;
