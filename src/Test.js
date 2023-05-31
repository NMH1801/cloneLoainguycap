import testCss from "./test.module.css";
import { FaUser } from "react-icons/fa";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Space, theme } from "antd";
import { useState } from "react";
const { Sider, Content } = Layout;
export const Test = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Row align="middle">
          <Space size="middle">
            <button className={testCss.button}>
              <FaUser style={{ fontSize: "18px", color: "red" }} />
            </button>
            <p><b>Danh sách người dùng</b></p>
          </Space>
        </Row>
      </Content>
    </Layout>
  );
};
