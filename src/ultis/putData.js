import axios from "axios";
import getRoute from "../const/api";

export const putData = async (value) => {
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(getRoute("userpost")+"/"+value.id, value, config);
      console.log(response.data);
      // Xử lý dữ liệu phản hồi ở đây
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây
    }
  };
  
  
