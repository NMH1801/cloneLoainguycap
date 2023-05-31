import {
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Row, Space } from 'antd';
import { useState } from 'react';
import logoImage from './assets/logo.png';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
export const Test = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          padding:"0px 16px",
          background: colorBgContainer,
        }}
      >
        <Row align="middle" style={{alignItems:'center'}}>
        <Space size="middle">
          <Button
          type="text"
          icon={<MenuOutlined style={{fontSize: "18px"}} />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '14px',
            width: 40,
            height: 40,
            borderRadius: "50%",
            alignItems: "center"
          }}
        />
        <Link to="./index" style={{display:"flex", alignItems:"center"}}>
        <img src={logoImage} alt="Logo" style={{height: "40px"}}/>
        </Link>
        <h1>HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN BẢO VỆ</h1>
        </Space>
        
        </Row>
      </Header>
      <Layout>

        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
