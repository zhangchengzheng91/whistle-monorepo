"use client";

import { App } from "antd";

/**
 * Ant Design 在 Next App Router 下需要 App 根，为 Drawer / Modal 等提供一致的弹层上下文，
 * 否则可能出现点击无响应或遮罩层异常。
 */
export default function AntdAppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <App>{children}</App>;
}
