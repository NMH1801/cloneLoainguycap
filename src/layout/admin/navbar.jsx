import { BsController, BsPen, BsSortDownAlt } from "react-icons/bs";
import { UserOutlined, MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { GiSheep } from "react-icons/gi";
import { AiFillDelete, AiFillInfoCircle, AiFillPlusCircle } from "react-icons/ai";
import {  Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
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
export const NavbarAdmin = ({props}) =>{
    const collapsed=props.collapsed;
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
      return (
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
// {/* 
//         <Content
//           style={{
//             padding: 24,
//             minHeight: 280,
//           }}
//         >
//         </Content> */}
      )
}