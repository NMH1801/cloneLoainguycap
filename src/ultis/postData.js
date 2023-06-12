import axios from "axios";
import {getDataAdmin} from "../const/api";

export const postData = async (value) => {
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(getDataAdmin("userpost"), value, config);
      console.log(response.data);
      // Xử lý dữ liệu phản hồi ở đây
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây
    }
  };
  
  
