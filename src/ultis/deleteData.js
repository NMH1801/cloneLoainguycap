import axios from "axios";
import { getRoute } from "../const/api";
import { message } from "antd";

export const deleteData = async (value) => {
  try {
    await axios.delete(getRoute("user")+"/"+value);
    message.success("Xóa thành công");

    // Xử lý dữ liệu phản hồi ở đây
  } catch (error) {
    // Xử lý lỗi ở đây
  }
};
