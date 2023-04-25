import { RouteObject } from 'react-router-dom';

import { MenuRecord } from '@/api/system/menu/type';
import { LoadablePage } from '@/components/lazy-component';
import PageLayout from '@/layouts/page-layout';

// export const generateRoutes = (menuList: MenuRecord[]): RouteObject[] => {
//   const routerList: RouteObject[] = [];

//   function travel(menus: MenuRecord[]) {
//     menus.forEach((menu) => {
//       let component;

//       if (menu.children && menu.children.length > 0) {
//         component = <PageLayout />;
//       } else {
//         component = LazyComponent(menu.component);
//       }
//       const route: RouteObject = {
//         path: menu.path,
//         element: component,
//         children: [],
//       };
//       if (menu.children?.length) {
//         travel(menu.children);
//       }
//       console.log(route);

//       routerList.push(route);
//     });
//   }
//   travel(menuList);

//   return routerList;
// };
export const generateRoutes = (menuList: MenuRecord[]): RouteObject[] => {
  const routerList: RouteObject[] = [];

  menuList.forEach((menu) => {
    let component;
    if (menu.children && menu.children.length > 0) {
      component = <PageLayout />;
    } else {
      component = <LoadablePage path={menu.component} />;
    }
    const route: RouteObject = {
      path: menu.path,
      element: component,
      children: [],
    };

    // 有子菜单的情况
    if (menu.children && menu.children.length > 0) {
      route.children?.push(...generateRoutes(menu.children));
    }
    routerList.push(route);
  });

  return routerList;
};

// const useAsyncRoutes = () => {
//   const [menus, status] = useMenus();
//   if (!status) {
//     return generateRoutes(menus);
//   }
//   return [];

//   //   const [routers] = useAtom(
//   //     useMemo(
//   //       // This is also fine
//   //       () => atom(async (get) => generateRoutes(await get(menuAsyncAtom))),
//   //       [],
//   //     ),
//   //   );
//   //   const routers = generateRoutes(menus);
//   //   return routers;
// };

// export default useAsyncRoutes;
