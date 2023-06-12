import axios from "axios";
import { getDataAdmin, getRoute } from "../const/api";
import { message } from "antd";

export const postData = async (value) => {
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(getDataAdmin("userpost"), value, config);
    message.success(response.data.message);
    // Xử lý dữ liệu phản hồi ở đây
  } catch (error) {
    // response.errors.forEach(item => {
      Object.keys(error.response.data.errors).forEach((field) => {
        const errorMessages = error.response.data.errors[field];
        errorMessages.forEach((errorMessage) => {
          message.error(errorMessage);
        });
      });
      return Promise.reject(error.response.data.errors);
    // Xử lý lỗi ở đây
  }
};

export const logOut = async (navigate) => {
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.post(getRoute("logout"), token, config);
    message.success("Đăng xuất thành công");
    setTimeout(() => {
      navigate("/dang-nhap");
    }, 2000);

    // Xử lý dữ liệu phản hồi ở đây
  } catch (error) {
    // Xử lý lỗi ở đây
  }
};
