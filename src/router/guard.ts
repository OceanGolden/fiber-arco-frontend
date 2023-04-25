import { MenuRecord } from '@/api/system/menu/type';

const useRoute = () => {
  const filterRoute = (routes: MenuRecord[], arr: MenuRecord[] = []) => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { permission, visible } = route;
      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }
    return arr;
  };
};

// export const filterRoutesFromMenus = (menus: MenuRecord[]): RouteObject[] => {
//   const aysncRoutes: RouteObject[] = [];
//   menus.forEach((menu) => {
//     let component;
//     if (!menu.component) {
//       component = <PageLayout />;
//     } else {
//       const modules = import.meta.glob('../../../../pages/**/*/index.tsx');
//       //   component = modules[`@/pages/${menu.component}/index.tsx`];
//       component = LazyComponent(menu.component);
//     }
//     const route: RouteObject = {
//       path: menu.path,
//       id: menu.id,
//       element: component,
//       children: [],
//       // meta: {
//       //   requiresAuth: true,
//       //   title: menu.name,
//       //   icon: menu.icon,
//       //   id: menu.id,
//       //   ignoreCache: true,
//       //   breadcrumb: []
//       // }
//     };
//     if (menu.children && menu.children.length > 0) {
//       route.children?.push(...filterRoutesFromMenus(menu.children));
//     }
//     aysncRoutes.push(route);
//   });
//   return aysncRoutes;
// };
