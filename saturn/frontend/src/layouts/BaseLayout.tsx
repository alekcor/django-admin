import React from "react";
import { Layout } from "antd";
import { ChildrenProps } from "../types/types";
import { Background } from "../components/Background";
import { Header } from "../components/Header/Header";

const { Content, Footer } = Layout;

export function BaseLayout({ children }: ChildrenProps) {
  return (
    <Layout className="site-layout">
      <Header />
      <Content style={{ margin: "16px" }}>
        <Background>{children}</Background>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Footer: Add Something here
      </Footer>
    </Layout>
  );
}
