import { FaPen, FaRegTrashAlt, FaUser, FaUserLock } from "react-icons/fa";
import "./user.css";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Switch,
  Table,
  Tag,
  Checkbox,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import {
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import getRoute from "../../const/api";
import { getDataAuth } from "../../ultis/getDataFromApi";
import { AuthContext } from "../../context/authContext";
import { postData } from "../../ultis/postData";

export const Nguoidung = () => {
  const { user } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const [isRolesLoaded, setRolesLoaded] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("add");
  const showModal = (method) => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (values) => {
    console.log("Received values:", values);
    postData(values);
    setIsModalOpen(false); // Đóng Modal sau khi đăng ký thành công
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        const newData = [];
        const Data = await getDataAuth("roles");
        Data.data.forEach((item) => {
          newData.push({
            id: item.id,
            name: item.name,
            color: item.meta.color,
            textColor: item.meta["text-color"],
          });
        });
        setRoles(newData);
        setRolesLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isRolesLoaded) {
      getRoles();
    }
  }, [isRolesLoaded]);
  const columns = [
    {
      title: "Tên hiển thị",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (status, record) => {
        return (
          <Switch
            checked={status}
            onChange={() => handleStatusChange(record)}
          />
        );
      },
    },
    {
      title: "Quyền",
      dataIndex: "tags",
      render: (_, { tags }) => {
        const tagColors = getTagColors(tags, roles);

        return (
          <>
            {tagColors.map((tagColor) => (
              <Tag
                className="myTag"
                color={tagColor.color}
                key={tagColor.id}
                style={{ color: tagColor.textColor }}
              >
                {tagColor.name}
              </Tag>
            ))}
          </>
        );
      },
    },

    {
      title: "Ngày tạo",
      dataIndex: "timeCreate",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Button type="link" icon={<FaUserLock />} className="grey" />
          <Button
            type="link"
            icon={<FaPen />}
            className="red"
            onClick={() => showModal(record)}
          />
          <Button type="link" icon={<FaRegTrashAlt />} className="red" />
        </>
      ),
    },
  ];
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = [];
        const response = await fetch(getRoute("user"));
        const Data = await response.json();
        Data.list.forEach((item, key) => {
          const roles = [];
          let inactive = false;
          item.roles.forEach((itemrole) => {
            roles.push(itemrole.id);
          });
          if (item.inactive != null) {
            inactive = !item.inactive;
          }
          newData.push({
            key: key,
            name: item.name,
            username: item.username,
            phoneNumber: item.mobile,
            status: inactive,
            tags: roles,
            timeCreate: item.created_at,
          });
        });
        setTableData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Content className="containerUser">
      <Row align="middle">
        <Space size="middle">
          <button className="buttonUser">
            <FaUser style={{ fontSize: "18px", color: "red" }} />
          </button>
          <p>
            <b>Danh sách người dùng</b>
          </p>
        </Space>
      </Row>

      <br />
      <Row>
        <Col span={16}>
          <Input
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            size="large"
            className="inputUser"
            prefix={<SearchOutlined className=".redButton" />}
          />
        </Col>
        <Col span={8}>
          <Button
            className="right"
            size="large"
            onClick={() => {
              showModal(true);
              setActiveForm("add");
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <br />
      <Table
        columns={columns}
        dataSource={tableData}
        rowClassName="myRow"
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        title={isModalOpen ? "Thêm mới" : "Sửa"}
        open={isModalOpen} // Thay đổi visible thành open
        onCancel={handleModalClose}
        footer={null}
      >
        <CreatePopupForm onFinish={handleFormSubmit} roles={roles} />
      </Modal>
    </Content>
  );
};

const getTagColors = (tags, roles) => {
  const tagColors = [];
  tags.forEach((tag) => {
    const role = roles.find((role) => role.id === tag);

    if (role) {
      tagColors.push({
        id: role.id,
        color: role.color,
        textColor: role.textColor,
        name: role.name,
      });
    }
  });

  return tagColors;
};

const CreatePopupForm = ({ onFinish, roles }) => {
  return (
    <Form onFinish={onFinish} roles={roles}>
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Tên hiển thị không được bỏ trống" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Tên hiển thị" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "Tên đăng nhập không được bỏ trống" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Email không được bỏ trống" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="E-Mail" />
      </Form.Item>
      <Form.Item name="phone">
        <Input prefix={<UserOutlined />} placeholder="Điện thoại" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Mật khẩu không được bỏ trống" },
          { min: 8, message: "Mật khẩu phải có ít nhất 8 kí tự" },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: "Vui lòng xác nhận mật khẩu" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Mật khẩu xác nhận không khớp");
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Mật khẩu xác nhận"
        />
      </Form.Item>
      <Form.Item
        name="role_ids"
        rules={[
          { required: true, message: "Quyền người dùng không được để trống" },
        ]}
      >
        <Checkbox.Group>
          {roles.map((item) => (
            <Checkbox key={item.id} value={item.id}>
              <Tag
                className="myTag"
                color={item.color}
                key={item.id}
                style={{ color: item.textColor }}
              >
                {item.name}
              </Tag>
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};
