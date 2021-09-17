import React from "react";
import { Menu } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface";

export const Overlay = (onOverlayClick: MenuClickEventHandler) => (
  <Menu onClick={onOverlayClick}>
    <Menu.Item key={0}>Delete Selected Users</Menu.Item>
  </Menu>
);
