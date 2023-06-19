import React from "react";
import { Layout, Menu } from "antd";
import { routes } from "../helper/routes";
import { useRouter } from "next/router";

const { Sider, Content } = Layout;

const PageLayout = (props) => {
  const router = useRouter();

  const getMenuRoutes = () => {
    return routes?.map((route) => {
      return {
        key: route?.route,
        label: route?.label,
        onClick: () => {
          router.push(route?.route);
        },
      };
    });
  };

  const getActiveRouteKey = () => {
    return routes?.find((route) => router?.pathname === route?.route)?.route;
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getActiveRouteKey()}
          items={getMenuRoutes()}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "90vh",
            background: "#fff",
          }}
        >
          {props?.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
