import { DataProvider } from "./context/DataContext";
import Footer from "./layout/search/footer/footer";
import Header from "./layout/search/header/header";
import { MainSearchV2 } from "./views/search/main/mainSearchv2";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Tintuc } from "./views/tintuc/tintuc";
import { Login } from "./views/dangnhap/dangnhap";
import { Test } from "./Test";
// import { LoginProvider } from "./context/authContext";
import { Nguoidung } from "./views/admin/user";
import { NavigateRoute, PrivateRoute } from "./views/dangnhap/privateRoute";
import { AuthProvider } from "./context/authContext";
import { AdminControl } from "./views/admin/adminControl";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<OutletHeaderFooter />}>
            <Route path="/search" element={<MainSearchV2 />} />
            <Route path="/tintuc" element={<Tintuc />} />
          </Route>
          <Route path="/" element={<OutletLogin/>}>
          <Route path="/" element={<NavigateRoute />}>
              <Route path="/dang-nhap" element={<Login />} />
            </Route>
          </Route>
          <Route path="/" element={<OutletAdmin />}>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/hethong/nguoidung" element={<Nguoidung />}></Route>
            </Route>
          </Route>
          <Route path="test" element={<Test />} />
          <Route path="/" element={<Index />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

function OutletHeaderFooter() {
  return (
    <>
      <DataProvider>
        <Header />
        <Outlet />
        <Footer />
      </DataProvider>
    </>
  );
}

function OutletAdmin() {
  return (
    <div>
      <AuthProvider>
        <AdminControl />
      </AuthProvider>
    </div>
  );
}

function OutletLogin(){
  return (
    <AuthProvider>
      <Outlet/>
    </AuthProvider>
  )
}
function Index() {
  return <h1>Trang chủ</h1>;
}
function NotFound() {
  return <h1>Link Not Found</h1>;
}

export default App;
