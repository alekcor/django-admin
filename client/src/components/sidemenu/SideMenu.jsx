import {TeamOutlined, HomeOutlined} from "@ant-design/icons";
import {Menu} from 'antd';
import Sider from "antd/es/layout/Sider";
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

export const SideMenuDark = ({collapsed, onCollapse}) => (
  <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
    <div className="logo"/>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="4" icon={<HomeOutlined />}>
        <Link to={"/"}>Home</Link>
      </Menu.Item>
      <SubMenu key="sub2" icon={<TeamOutlined/>} title="Auth">
        <Menu.Item key="6">Groups</Menu.Item>
        <Menu.Item key="8">
          <Link to={"/auth/user"}>User</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
)
