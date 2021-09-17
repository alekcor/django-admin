import React from "react";
import { Menu, Layout, Avatar, Dropdown, Space, Divider } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "./Header.css";

const menuItems = (
  <Menu>
    <Menu.Item>
      <Avatar
        style={{ margin: 8 }}
        src={
          "https://avatars.githubusercontent.com/u/13952931?s=400&u=9326220a94c303c21dc0da56f1f2ff3c10ed591f&v=4"
        }
      />
      <span>Augusto Goulart</span>
    </Menu.Item>
    <Divider style={{ margin: 4 }} />
    <Menu.Item icon={<SettingOutlined />}>Settings</Menu.Item>
    <Divider style={{ margin: 4 }} />
    <Menu.Item icon={<LoginOutlined />}>Log in</Menu.Item>
    <Divider style={{ margin: 4 }} />
    <Menu.Item icon={<LogoutOutlined />}>Log out</Menu.Item>
  </Menu>
);

export function Header(): JSX.Element {
  return (
    <Layout.Header className="site-layout-background">
      <Space direction={"vertical"} className={"avatar-menu"}>
        <Dropdown
          overlay={menuItems}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div>
            <span>
              Welcome, <strong>Augusto</strong>
            </span>
            <Avatar
              style={{ left: 8 }}
              src={
                "https://avatars.githubusercontent.com/u/13952931?s=400&u=9326220a94c303c21dc0da56f1f2ff3c10ed591f&v=4"
              }
            />
          </div>
        </Dropdown>
      </Space>
    </Layout.Header>
  );
}
