import { Layout } from "@arco-design/web-react";

const Footer = () => {
  return (
    <Layout.Footer
      className={
        "flex bg-arco-fill-2 items-center justify-center h-12 text-arco-text-3 text-center"
      }
    >
      Copyright @ 2021-{new Date().getFullYear()} Fiber Arco React. All Rights
      Reserved
    </Layout.Footer>
  );
};

export default Footer;
