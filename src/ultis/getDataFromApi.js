import {getRoute, getDataAdmin}   from "../const/api";
import axios from "axios";
export const getDataFromApi= async(param, filter) => {
  const response = await fetch(getRoute(param, filter));
  const jsonData = await response.json();
  return jsonData;
}
export const getDataAuth = async (param, array, filter, sort, sign) => {
  const token=localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
  .get(getDataAdmin(param, array, filter, sort, sign), config)
  .then((res) => {
    return res
  })
};
