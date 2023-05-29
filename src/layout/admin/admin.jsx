import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

export const Admin = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('jwtToken');
          // Set the Authorization header with the token
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          config.method = 'get'
  
          // Make the request to the server
          const response = await axios.get('http://wlp.howizbiz.com/api/me', config);
  
          // Process the response data
          const data = response.data;
          console.log(data);
          localStorage.setItem("username", data.user.username);
          // Check if fetchData is successful
          if (!data) {
            navigate('/dang-nhap');
          }
        } catch (error) {
          // Handle error
          console.error(error);
          navigate('/dang-nhap');
        }
      };
  
      fetchData();
    }, [navigate]);
    const logout = () => {
      localStorage.clear();
      navigate('/dang-nhap');
    };
    return <Button onClick={logout}>Log out</Button>;
  };

  
