import { MenuOutlined } from "@ant-design/icons";
import { Button, theme, Row, Space, Col, Popover, Layout, Menu } from "antd";
import nguoidungCss from "./header.module.css";
import { useState } from "react";
import logoImage from "../../assets/logo.png";
import { Link, Outlet } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { BsController, BsSortDownAlt, BsPen } from 'react-icons/bs';
import { AiFillPlusCircle, AiFillDelete, AiFillInfoCircle } from "react-icons/ai"

import { GiSheep } from 'react-icons/gi';
import { UserOutlined } from '@ant-design/icons';
const { Sider, Content } = Layout;
function getItem(label, key, icon, link, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
    // link,
  };
}
export const HeaderUser = () => {
  const items = [
    getItem('Bảng điều khiển', '1', <BsController />, '/bang-dieu-khien'),
    getItem('Quản lý người dùng', '2', <UserOutlined />, '/he-thong/nguoi-dung'),
    getItem('Phân loại học', '3', <BsSortDownAlt />, '/phan-loai-hoc'),
    getItem('Loài nguy cấp quý hiếm', '4', <GiSheep />, '/loai'),
    getItem('Bài viết', '5', <BsPen />, 'bai-viet'),
    getItem('Phiếu đề xuất', 'sub1', <MailOutlined />, '', [
      getItem('Đưa loài vào', '6', <AiFillPlusCircle />, "/phieu-de-xuat/dua-loai-vao/"),
      getItem('Đưa loài ra', '7', <AiFillDelete />, "/phieu-de-xuat/dua-loai-ra/"),
      getItem('Phiếu thông tin', '8', <AiFillInfoCircle />, "/phieu-de-xuat/phieu-cung-cap-thong-tin/"),
    ]),
    getItem('Danh mục', 'sub2', <AppstoreOutlined />, '', [
      getItem('Danh mục tĩnh', '9', <AiFillPlusCircle />, "/danh-muc/danh-muc-tinh/"),
      getItem('Danh mục động', '10', <AiFillDelete />, "/danh-muc/danh-muc-dong"),
    ]),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const content = (
    <>
      <div className={nguoidungCss.popperContainer}>
        <div
          className={nguoidungCss.button}
          style={{ width: "60px", height: "60px" }}
        >
          B
        </div>
        <br />
        <div className={nguoidungCss.text}>
          <b>Ban quản lý dự án</b>
        </div>
        <Link className={nguoidungCss.textColor}>
          <b>Ban quản lý dự án</b>
        </Link>
        <br />
      </div>
      <div className={nguoidungCss.popperBottom}>
        <Link
          className={nguoidungCss.popperBottomText}
          style={{ color: "black" }}
        >
          Hồ sơ
        </Link>
        <Link
          className={nguoidungCss.popperBottomText}
          style={{ color: "red" }}
        >
          Đăng xuất
        </Link>
      </div>
    </>
  );
  return (
    <Layout>
      <Header
        style={{
          padding: "0px 16px",
          background: colorBgContainer,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 100,
        }}
      >
        <Row align="middle" style={{ alignItems: "center" }}>
          <Col>
            <Space size="middle">
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: "18px" }} />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "14px",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  alignItems: "center",
                }}
              />
              <Link to="/index" style={{ display: "flex", alignItems: "center" }}>
                <img src={logoImage} alt="Logo" style={{ height: "40px" }} />
              </Link>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU
                TIÊN BẢO VỆ
              </h1>
            </Space>
          </Col>
          <Col flex="auto">
            <div
              style={{
                float: "right",
              }}
            >
              <Popover
                placement="bottom"
                content={content}
                trigger="click"
                style={{
                  marginRight: "10px",
                }}
              >
                <div className={nguoidungCss.container}>
                  <Space size="small">
                    <div className={nguoidungCss.button}>B</div>
                    <div className={nguoidungCss.text}>
                      <p>
                        <b>Ban quản lý dự án</b>
                      </p>
                    </div>
                  </Space>
                </div>
              </Popover>
            </div>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider
          style={{
            minHeight: '100vh', backgroundColor: 'white', borderRight: "1px solid #e8e8e8",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
          }}
          width={240}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="fixed-sider"
        >
          <div className="logo" />
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            // inlineCollapsed={collapsed}
            items={items.map(item => ({
              ...item,
              label: (
                <Link to={item.link}>{item.label}</Link>
              ),
            }))}
          />
        </Sider>

        <Content
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
