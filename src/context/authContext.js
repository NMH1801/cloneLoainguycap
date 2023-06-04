import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  
  const checkAuth = (token) => {
    setIsChecking(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios
      .get("http://wlp.howizbiz.com/api/me", config)
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data.user);
        return res.data.user;
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsChecking(false);
      });
  };
  if (!isChecking && !isAuthenticated && token) {
    checkAuth(token);
  }

  const login = (token) => {
    localStorage.setItem("user-token", token);
    setIsAuthenticated(true);
    setToken(token);
    // checkAuth(token);
  };
  const logout = () => {
    localStorage.removeItem("user-token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isChecking, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

