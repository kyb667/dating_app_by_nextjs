"use client";

import React from "react";
import { Layout, Space } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  // backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  // color: "#fff",
  backgroundColor: "rightgray",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  // color: "#fff",
  // backgroundColor: "#7dbcea",
};

export default function layout({ children, headerStr }: { children: React.ReactNode, headerStr : string }) {
  return (
    <Layout>
      <Header style={headerStyle}>{headerStr}</Header>
      <Content style={contentStyle}>{children}</Content>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
  );
}
