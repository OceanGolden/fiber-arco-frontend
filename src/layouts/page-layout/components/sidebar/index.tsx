import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { routesAtom } from '@/App';
import { menusAtom } from '@/atoms/menu_atom';
import DynamicIcon from '@/components/dynamic-icon';
import { generateRoutes } from '@/hooks/useAsyncRoutes';
import useToggle from '@/hooks/useToggle';
import { defaultRoutes } from '@/router';
import { Layout, Menu } from '@arco-design/web-react';

import type { MenuRecord } from '@/api/system/menu/type';
const renderMenu = (menus: MenuRecord[]) => {
  if (!menus) {
    return [];
  }
  return menus.map((item) => {
    // if (item.type === SystemMenuEnum.Catalog && item.children?.length) {
    if (!!item.children) {
      return (
        <Menu.SubMenu
          key={item.path}
          title={
            <span>
              <DynamicIcon icon={item.icon} />
              {item.name}
            </span>
          }
        >
          {renderMenu(item.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.path}>
        <span>
          <DynamicIcon icon={item.icon} />
          {item.name}
        </span>
      </Menu.Item>
    );
  });
};

const Sidebar = () => {
  const menus = useAtomValue(menusAtom);
  const setRoutes = useSetAtom(routesAtom);
  const [collapsed, toggle] = useToggle(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const pathnames = pathname
    .split('/')
    .filter((x) => x)
    .map((e) => `/${e}`);
  const [openKeys, setOpenKeys] = useState<string[]>(pathnames.slice(0, -1));
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

  useEffect(() => {
    setRoutes([...defaultRoutes, ...generateRoutes(menus)]);
  }, [menus]);

  return (
    <Layout.Sider
      className='z-99 flex flex-col h-full overflow-y-auto'
      width={220}
      collapsed={collapsed}
      trigger={null}
      collapsible
      breakpoint='xl'
    >
      <Menu
        className='h-full'
        accordion
        autoScrollIntoView
        hasCollapseButton
        onCollapseChange={toggle}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClickSubMenu={(_, openKeys: string[]) => {
          setOpenKeys(openKeys);
        }}
        onClickMenuItem={(key: string, _event: any, keyPath: string[]) => {
          setSelectedKeys(keyPath);
          navigate(key);
        }}
      >
        {renderMenu(menus)}
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
