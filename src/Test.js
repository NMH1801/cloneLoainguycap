import testCSS from "./test.module.css"
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { BsController, BsSortDownAlt, BsPen } from 'react-icons/bs';
import {AiFillPlusCircle,AiFillDelete, AiFillInfoCircle } from "react-icons/ai"
import {FaUser} from "react-icons/fa"
import { GiSheep } from 'react-icons/gi';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Layout, Row, Space, Button, Table, Switch } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

const items = [
  getItem('Bảng điều khiển', '1', <BsController />, '/bang-dieu-khien'),
  getItem('Quản lý người dùng', '2', <UserOutlined />, '/he-thong/nguoi-dung'),
  getItem('Phân loại học', '3', <BsSortDownAlt />, '/phan-loai-hoc'),
  getItem('Loài nguy cấp quý hiếm', '4', <GiSheep />, '/loai'),
  getItem('Bài viết', '5', <BsPen />, 'bai-viet'),
  getItem('Phiếu đề xuất', 'sub1', <MailOutlined />, '', [
    getItem('Đưa loài vào', '6',<AiFillPlusCircle/>, "/phieu-de-xuat/dua-loai-vao/"),
    getItem('Đưa loài ra', '7', <AiFillDelete />, "/phieu-de-xuat/dua-loai-ra/"),
    getItem('Phiếu thông tin', '8', <AiFillInfoCircle />, "/phieu-de-xuat/phieu-cung-cap-thong-tin/"),
  ]),
  getItem('Danh mục', 'sub2', <AppstoreOutlined />, '', [
    getItem('Danh mục tĩnh', '9', <AiFillPlusCircle/>, "/danh-muc/danh-muc-tinh/"),
    getItem('Danh mục động', '10', <AiFillDelete />,"/danh-muc/danh-muc-dong"),
  ]),
];


const data = [
  {
    key: '1',
    name: 'John Brown',
    phoneNumber: '0935132641',
    status: true,
    tags: 'tag1',
    timeCreate: '2023-05-31',
  },
  {
    key: '2',
    name: 'Jim Green',
    phoneNumber: '0987654321',
    status: false,
    tags: 'tag2',
    timeCreate: '2023-05-30',
  },
  {
    key: '3',
    name: 'Joe Black',
    phoneNumber: '0123456789',
    status: true,
    tags: 'tag3',
    timeCreate: '2023-05-29',
  },
  {
    key: '4',
    name: 'Emily Smith',
    phoneNumber: '0765432198',
    status: false,
    tags: 'tag4',
    timeCreate: '2023-05-28',
  },
  {
    key: '5',
    name: 'Michael Johnson',
    phoneNumber: '0943216789',
    status: true,
    tags: 'tag5',
    timeCreate: '2023-05-27',
  },
  {
    key: '6',
    name: 'Sophia Wilson',
    phoneNumber: '0823456712',
    status: false,
    tags: 'tag6',
    timeCreate: '2023-05-26',
  },
  {
    key: '7',
    name: 'William Brown',
    phoneNumber: '0976543210',
    status: true,
    tags: 'tag7',
    timeCreate: '2023-05-25',
  },
  {
    key: '8',
    name: 'Olivia Davis',
    phoneNumber: '0912345678',
    status: false,
    tags: 'tag8',
    timeCreate: '2023-05-24',
  },
  {
    key: '9',
    name: 'James Taylor',
    phoneNumber: '0856789432',
    status: true,
    tags: 'tag9',
    timeCreate: '2023-05-23',
  },
  {
    key: '10',
    name: 'Emma Anderson',
    phoneNumber: '0998765432',
    status: false,
    tags: 'tag10',
    timeCreate: '2023-05-22',
  },
  {
    key: '11',
    name: 'Noah Clark',
    phoneNumber: '0965432178',
    status: true,
    tags: 'tag11',
    timeCreate: '2023-05-21',
  },
  {
    key: '12',
    name: 'Ava Thomas',
    phoneNumber: '0876543219',
    status: false,
    tags: 'tag12',
    timeCreate: '2023-05-20',
  },
  {
    key: '13',
    name: 'Liam Martin',
    phoneNumber: '0923456718',
    status: true,
    tags: 'tag13',
    timeCreate: '2023-05-19',
  },
  {
    key: '14',
    name: 'Isabella Garcia',
    phoneNumber: '0843216756',
    status: false,
    tags: 'tag14',
    timeCreate: '2023-05-18',
  },
  {
    key: '15',
    name: 'Mason Rodriguez',
    phoneNumber: '0932145678',
    status: true,
    tags: 'tag15',
    timeCreate: '2023-05-17',
  },
  {
    key: '16',
    name: 'Sophia Lopez',
    phoneNumber: '0887654321',
    status: false,
    tags: 'tag16',
    timeCreate: '2023-05-16',
  },
  {
    key: '17',
    name: 'Elijah Martinez',
    phoneNumber: '0954321768',
    status: true,
    tags: 'tag17',
    timeCreate: '2023-05-15',
  },
  {
    key: '18',
    name: 'Charlotte Hernandez',
    phoneNumber: '0865432179',
    status: false,
    tags: 'tag18',
    timeCreate: '2023-05-14',
  },
  {
    key: '19',
    name: 'Ethan Thompson',
    phoneNumber: '0912345678',
    status: true,
    tags: 'tag19',
    timeCreate: '2023-05-13',
  },
  {
    key: '20',
    name: 'Amelia Lewis',
    phoneNumber: '0823456719',
    status: false,
    tags: 'tag20',
    timeCreate: '2023-05-12',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
export const Test = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tableData, setTableData] = useState(data);

  const handleStatusChange = (record) => {
    const updatedData = tableData.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          status: !item.status,
        };
      }
      return item;
    });
    setTableData(updatedData);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const columns = [
    {
      title: 'Tên hiển thị',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (status, record) => (
        <Switch checked={status} onChange={() => handleStatusChange(record)} />
      ),
    },
    {
      title: 'Quyền',
      dataIndex: 'tags',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'timeCreate',
    },
    {
      title: 'Hành động',
      dataIndex: 'action'
    }
  ];
  return (
    <Layout>
      <Sider
        style={{ minHeight: '100vh', backgroundColor: 'white', borderRight: "1px solid #e8e8e8",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"}}
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
      <Layout>
      <Content
        style={{
          padding: 24,
          minHeight: 280,
        }}
      >
        <Row align="middle">
          <Space size="middle">
            <button className={testCSS.button}>
              <FaUser style={{ fontSize: "18px", color: "red" }} />
            </button>
            <p><b>Danh sách người dùng</b></p>
          </Space>
        </Row>
        <>
        <Table columns={columns} dataSource={data} onChange={onChange} />;
    </>
      </Content>
      </Layout>
    </Layout>
  );
};
