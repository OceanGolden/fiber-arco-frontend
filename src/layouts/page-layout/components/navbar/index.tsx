import Logo from "@/assets/logo.svg";
import { Input, Layout, Space } from "@arco-design/web-react";

// import UserAvatar from "./components/user-info";

const Navbar = () => {
  return (
    <Layout.Header className="z-100 h-15 inset-0 sticky w-full flex justify-between bg-arco-bg-2 shadow ">
      <div className="flex items-center">
        <div className="flex items-center pl-6 text-4xl">
          <Logo />
        </div>
        <h5 className="flex items-center pl-3 text-xl">Fiber Arco Pro</h5>
        {/* <Typography.Title heading={5}>Fiber Arco Pro</Typography.Title> */}
      </div>
      <div className="flex pr-6 items-center">
        <Space size={"medium"}>
          <Input.Search className="rounded-2xl" placeholder={"搜索"} />
          <div className="language">language</div>
          <div className="message-box">message-box</div>
          <div className="changelight">dark</div>
          <div className="settings">settings</div>
          <div className="user-info">{/* <UserAvatar /> */}</div>
        </Space>
      </div>
    </Layout.Header>
  );
};

export default Navbar;
