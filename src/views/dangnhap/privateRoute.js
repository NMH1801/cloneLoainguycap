import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated, isChecking } = useContext(AuthContext);

  console.log(isAuthenticated, isChecking);
  if (isChecking) {
    return <div></div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
