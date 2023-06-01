import { DataProvider } from "./context/DataContext";
import Footer from "./views/footer/footer";
import Header from "./views/header/header";
import { MainSearchV2 } from "./layout/search/main/mainSearchv2";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Tintuc } from "./layout/tintuc/tintuc";
import { Login } from "./layout/dangnhap/dangnhap";
import { Test } from "./Test";
import { Admin } from "./layout/admin/admin";
import { LoginProvider } from "./context/loginContext";
import { HeaderUser } from "./layout/admin/header";
import { Nguoidung } from "./layout/admin/user";
function App() {
  return (
    <div>
      <Router>
        <LoginProvider>
          <Routes>
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="hethong/nguoidung" element={<HeaderUser/>}/> */}

            <Route path="/" element={<OutletHeaderFooter />}>
              <Route path="/search" element={<MainSearchV2 />} />
              <Route path="/tintuc" element={<Tintuc />} />
            </Route>
            <Route path="/" element={<OutletAdmin/>}>
              <Route path="/hethong/nguoidung" element={<Nguoidung/>}></Route>
            </Route>

            <Route path="/" element={<Index />} />
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </LoginProvider>
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

function OutletAdmin(){
  return (
    <>
      <HeaderUser/>
    </>
  )
}
function Index() {
  return <h1>Trang chủ</h1>;
}
function NotFound() {
  return <h1>Link Not Found</h1>;
}

export default App;
