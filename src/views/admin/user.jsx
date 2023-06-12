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
  Pagination,
  Select,
  Spin,
  DatePicker,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import {
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { getDataAuth } from "../../ultis/getDataFromApi";
import { AuthContext } from "../../context/authContext";
import { postData } from "../../ultis/postData";
import { putData } from "../../ultis/putData";
import { debounce } from "lodash";

export const Nguoidung = () => {
  const { user } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isRolesLoaded, setRolesLoaded] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("add");
  const [record, setRecord] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [inactive, setInactive] = useState();
  const [filterRole, setFilterRole] = useState();
  const [search, setSearch] = useState();
  const handleDateStartChange = (date, dateString) => {
    let convertedDate = dateString.replace(/\//g, "%2F");
    if(date===null){
      convertedDate=null;
    }
    setDateStart(convertedDate);
  };

  const handleDateEndChange = (date, dateString) => {
    let convertedDate = dateString.replace(/\//g, "%2F");
    if(date===null){
      convertedDate=null;
    }
    setDateEnd(convertedDate);
  };
  const handleFilterRoleChange = (value) =>{
    if(value===undefined){
      value=null;
    }
    setFilterRole(value);
  }
  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  const handleSearch =(value) => {
    if(value===""){
      value=null;
    }
    setSearch(value);
  }
  const handleSearchDebounced = debounce(handleSearch, 500);

  const handleSearchChange= (e) =>{
    handleSearchDebounced(e.target.value)
  }
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Tên hiển thị",
      dataIndex: "name",
      visible: true,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      visible: true,
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      visible: true,
    },
    { title: "Email", dataIndex: "email", visible: false },
    {
      title: "Trạng thái",
      dataIndex: "status",
      visible: true,
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (status, record) => {
        return (
          <Switch
            checked={status}
            // onChange={() => handleStatusChange(record)}
          />
        );
      },
    },
    {
      title: "Quyền",
      dataIndex: "tags",
      visible: true,
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
      visible: true,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      visible: true,
      render: (_, record) => (
        <Space size="small" className="action-buttons">
          <Button type="link" icon={<FaUserLock />} className="grey" />
          <Button
            type="link"
            icon={<FaPen />}
            className="red"
            onClick={() => {
              setRecord(record);
              setActiveForm("edit");
              showModal();
            }}
          />
          <Button type="link" icon={<FaRegTrashAlt />} className="red" />
        </Space>
      ),
    },
  ];
  const handleStatusFilterChange = (value) => {
    setInactive(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newData = [];
        const response = await getDataAuth("user", [currentPage, pageSize], {
          inactive: inactive,
          dateStart: dateStart,
          dateEnd:dateEnd,
          filterRole:filterRole,
          search:search,
        });
        const Data = await response.data;
        setLoading(false);
        setTotal(Data.pagination.total);
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
            key: item.id,
            name: item.name,
            username: item.username,
            phoneNumber: item.mobile,
            status: inactive,
            tags: roles,
            timeCreate: item.created_at,
            email: item.email,
          });
        });
        setTableData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, pageSize, dateStart, dateEnd, inactive, filterRole, search]);
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
            onChange={handleSearchChange}
          />
        </Col>
        <Col span={8}>
          <Button
            className="right"
            size="large"
            onClick={() => {
              setActiveForm("add");
              setRecord({
                name: "",
                username: "",
                phoneNumber: "",
                roles_id: "",
              });
              showModal();
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Space>
        <Select
      defaultValue="null"
      style={{
        width: 120,
      }}
      onChange={handleStatusFilterChange}
      options={[
        {
          value: 'false',
          label: 'Hoạt động',
        },
        {
          value: 'true',
          label: 'Vô hiệu',
        },
        {
          value: 'null',
          label: 'Toàn bộ',
        },
      ]}
    />
          <Select
            style={{
              width: 200,
            }}
            placeholder="Quyền"
            allowClear
            onChange={handleFilterRoleChange}
          >
            {roles.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
          <DatePicker
            placeholder="Ngày bắt đầu"
            format="DD/MM/YYYY"
            onChange={handleDateStartChange}
          />
          <DatePicker
            placeholder="Ngày kết thúc"
            format="DD/MM/YYYY"
            onChange={handleDateEndChange}
          />
        </Space>
      </Row>
      <br/>
      <Spin spinning={loading}>
        <div className="table-responsive">
          <Table
            columns={columns.filter((column) => column.visible)}
            dataSource={tableData}
            rowClassName="myRow"
            pagination={false}
          />
        </div>
        <br />
        <Row justify="space-between" align="middle">
          <Col span={8}>
            <p>{`${(currentPage - 1) * pageSize + 1}-${Math.min(
              currentPage * pageSize,
              total
            )} of ${total} items`}</p>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <Pagination
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChange={handleCurrentPage}
            />
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Select value={pageSize.toString()} onChange={handlePageSizeChange}>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="25">25</Select.Option>
            </Select>
          </Col>
        </Row>
      </Spin>
      <Modal
        title={activeForm === "add" ? "Thêm mới" : "Sửa"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <CreatePopupForm
          roles={roles}
          record={record}
          activeForm={activeForm}
          handleModalClose={handleModalClose}
        />
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

const CreatePopupForm = ({ onFinish, roles, record, activeForm, handleModalClose }) => {
  const disabled = true;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: record.name,
      username: record.username,
      email: record.email,
      phone: record.phone,
      role_ids: record.tags,
    });
  }, [record, form]);
  onFinish = async (values) => {
    try {
      if (activeForm === "add") {
        values.khubaoton = [];
        await postData(values);
      } else {
        values.khubaoton = [];
        values.id = record.key;
        await putData(values);
      }
      setTimeout(() => {
        handleModalClose();
      }, 2000);

     
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Tên hiển thị không được bỏ trống" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Tên hiển thị"></Input>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "Tên đăng nhập không được bỏ trống" },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Tên đăng nhập"
          disabled={activeForm === "edit" ? disabled : false}
        />
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
      {activeForm === "add" && (
        <>
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
        </>
      )}

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
          {activeForm === "add" ? "Thêm mới" : "Sửa"}
        </Button>
      </Form.Item>
    </Form>
  );
};
