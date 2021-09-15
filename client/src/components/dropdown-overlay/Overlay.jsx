import {Menu} from "antd";

export const Overlay = (onOverlayClick) => (
  <Menu onClick={onOverlayClick}>
    <Menu.Item key={0}>Delete Selected Users</Menu.Item>
  </Menu>
)
