import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import React, {useContext, useState} from "react";
import { Registered } from "../types/types";
import { RegisteredContext } from "../context/RegisteredContext";

const { Sider } = Layout;

export function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  function onCollapse(collapsed: boolean): void {
    setCollapsed(collapsed);
  }

  const items = useContext(RegisteredContext)

  if (items) {
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Link to={'/saturn/'}>
          <div className={'logo'} />
        </Link>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {items.map((app: Registered) => (
              <Menu.Item key={app.app_label}>
                <Link to={app.app_url}>{app.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Menu>
      </Sider>
    );
  }
  return null;
}
