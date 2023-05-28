import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
export const Test = () => {
    const onFinish = (values) => {
      console.log("Received values of form: ", values);
    };
    const onFinishFailed = () => {
      console.log("failed");
    };
    return (
      <Form
      name="login-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      wrapperCol={{
        span: 20
      }}
      style={{
        padding: "16px",
        textAlign: "center",
        minWidth: "600px",
      }}
      >
        <Link to="/">
          <img
            src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png"
            alt="Logo"
            style={{
              height: "110px",
            }}
          />
        </Link>
  
        <h2>Đăng nhập</h2>
  
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên đăng nhập!",
            },
          ]}
  
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên đăng nhập"
            wrapperCol={{
              span: 20
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <Link className="login-form-forgot" href="/quen-mat-khau">
            Forgot password
          </Link>
        </Form.Item>
      </Form>
    );
  };
