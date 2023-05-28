import dangnhap from "./dangnhap.module.css";
import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
export const Login = () => {
  return (
    <div className={dangnhap.login}>
      <Header />
      <Footer />
    </div>
  );
};

function Header() {
  return (
    <div className={dangnhap.header}>
      <Row align="middle">
        <Col>
          <Link to="/">
            <img
              src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png"
              alt="Logo"
              style={{
                height: "70px",
              }}
            />
          </Link>
        </Col>
        <Col flex="auto">
          <h1>
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h1>
        </Col>
      </Row>
    </div>
  );
}

function Footer() {
  return (
    <div className={dangnhap.footerContainer + " " + dangnhap.formContainer}>
      <div className={dangnhap.form}>
        <LoginForm />
      </div>
    </div>
  );
}

const LoginForm = () => {
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


// const LoginForm = () => {
//     const onFinish = (values) => {
//       console.log("Success:", values);
//     };
  
//     const onFinishFailed = (errorInfo) => {
//       console.log("Failed:", errorInfo);
//     };
  
//     return (
//       <Form
//         name="login-form"
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         wrapperCol={{
//           span: 20
//         }}
//         style={{
//           padding: "16px",
//           textAlign: "center",
//           minWidth: "600px",
//         }}
//       >
//         <Form.Item
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your username!"
//             }
//           ]}
//         >
//           <Input prefix={<UserOutlined />} placeholder="Username" />
//         </Form.Item>
        
//         <Form.Item
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!"
//             }
//           ]}
//         >
//           <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//         </Form.Item>
  
//         <Form.Item>
//           <Button type="primary" htmlType="submit" className="login-form-button">
//             Log in
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   };
  