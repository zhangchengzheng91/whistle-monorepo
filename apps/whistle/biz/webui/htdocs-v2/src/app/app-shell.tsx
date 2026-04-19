"use client";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const { Header, Sider, Content } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "variables",
    label: "变量管理",
    children: [
      {
        key: "/variables/projects",
        label: <Link href="/variables/projects">项目管理</Link>,
      },
      {
        key: "/variables/search",
        label: <Link href="/variables/search">变量查询</Link>,
      },
    ],
  },
  {
    key: "/rules",
    label: <Link href="/rules">规则列表</Link>,
  },
];

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const selectedKeys = useMemo(() => {
    if (!pathname) return [];
    if (pathname.startsWith("/variables/projects")) {
      return ["/variables/projects"];
    }
    if (pathname.startsWith("/variables/search")) {
      return ["/variables/search"];
    }
    if (pathname.startsWith("/rules")) {
      return ["/rules"];
    }
    return [];
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          paddingInline: 24,
          color: "#fff",
        }}
      >
        Header
      </Header>
      <Layout>
        <Sider width={220} theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={["variables"]}
            style={{ borderInlineEnd: 0 }}
            items={menuItems}
          />
        </Sider>
        <Content
          style={{
            margin: 24,
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
