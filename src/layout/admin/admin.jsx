import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  
          // Make the request to the server
          const response = await axios.get('http://wlp.howizbiz.com/api/me', config);
  
          // Process the response data
          const data = response.data;
          console.log(data);
          
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
  
    return <h1>Log in thành công</h1>;
  };
  
