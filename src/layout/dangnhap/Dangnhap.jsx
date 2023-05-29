import dangnhap from "./dangnhap.module.css";
import React, { useState } from "react";
import { Alert, Row, Col, Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
export const Login = () => {
  console.log("render");
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

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const onFinish = (values) => {
    PostData(values);
  };
  const onFinishFailed = () => {
    console.log("failed");
  };
  const PostData = async (value) => {
    setLoading(true);
    setSuccess(true);
    try {
      const response = await axios.post(
        "http://wlp.howizbiz.com/api/web-authenticate",
        value
      );
      console.log(response.data);
      setLoading(false);
      localStorage.setItem("jwtToken", response.data.access_token);
      navigate("/admin");
      // Xử lý dữ liệu phản hồi ở đây
    } catch (error) {
      setMessage(error.response.data.message);
      console.error(error);
      setLoading(false);
      setSuccess(false);
      // Xử lý lỗi ở đây
    }
  };
  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      wrapperCol={{
        span: 24,
      }}
      style={{
        padding: "16px",
        textAlign: "center",
        width: "400px",
      }}
    >
      {!success && <Alert message={message} type="error" showIcon />}
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
          {loading ? (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{
                width: "100%",
                backgroundColor: "red",
                borderRadius: "24px",
              }}
              loading
            >
              Đang đăng nhập
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{
                width: "100%",
                backgroundColor: "red",
                borderRadius: "24px",
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Form.Item>
        <Button
          type="link"
          href="/quen-mat-khau"
          style={{
            color: "red",
          }}
        >
          Quên mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};
