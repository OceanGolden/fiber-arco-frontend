import { matchRoutes, useNavigate, useOutlet } from 'react-router-dom';

import { TokenEnum } from '@/common/constants';
import useMenus from '@/hooks/useMenus';
import Storage from '@/utils/storage';
import { Message } from '@arco-design/web-react';
import { useEffect } from 'react';

const AuthRouter = ({ children }: any) => {
  const navigate = useNavigate();
  const access = Storage.get(TokenEnum.Access);
  const [menus, loadingMenus] = useMenus();

  const menusList = [...menus, { path: '/' }, { path: 'login' }];
  const mathchs = matchRoutes(menusList, location);
  const isExist = mathchs?.some((route) => route.pathname == location.pathname);
  console.log(isExist);

  const outlet = useOutlet();
  useEffect(() => {
    if (!access) {
      Message.error('登录过期，请重新登录!');
      navigate('/');
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (access && isExist) {
      // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
      if (location.pathname == '/' || location.pathname == '/login') {
        navigate('/dashboard');
      } else {
        // 如果是其他路由就跳到其他的路由
        navigate(location.pathname);
      }
    }
  }, [access, location.pathname]);
  if (!!children) {
    return <>{children}</>;
  }
  return outlet;
};

export default AuthRouter;
