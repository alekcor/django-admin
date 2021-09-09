import 'antd/dist/antd.css';
import './layout.scss'
import {SideMenuDark} from "../components/sidemenu/SideMenu";
import {Breadcrumb, Layout} from 'antd';
import {Component} from "react/cjs/react.production.min";

const { Content, Footer } = Layout;


class SaturnLayout extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenuDark collapsed={collapsed} onCollapse={this.onCollapse} />
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Auth</Breadcrumb.Item>
              <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Django Saturn ©2020 Created by Augusto Goulart</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default SaturnLayout;
