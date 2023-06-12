import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated, isChecking } = useContext(AuthContext);

  if (isChecking) {
    return <div></div>;
  }
  console.log(isAuthenticated, isChecking);
  return isAuthenticated ? <Outlet /> : <Navigate to="/dang-nhap" replace />;
};

export const NavigateRoute = () =>{
  const { isAuthenticated} = useContext(AuthContext);
  console.log(isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to="/hethong/nguoidung" replace />;
}