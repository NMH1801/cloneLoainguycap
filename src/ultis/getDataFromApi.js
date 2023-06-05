import getRoute from "../const/api";
import axios from "axios";
export const getDataFromApi= async(param, filter) => {
  const response = await fetch(getRoute(param, filter));
  const jsonData = await response.json();
  return jsonData;
}
export const getDataAuth = async (param, filter) => {
  const token=localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
  .get(getRoute(param, filter), config)
  .then((res) => {
    return res
  })
};
