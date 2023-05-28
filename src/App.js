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
import { Login } from "./layout/dangnhap/Dangnhap";
import { Test } from "./Test";
function App() {
  return (
    <div>
      <Router>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/test" element={<Test/>}/>
            <Route path="/" element={<OutletHeaderFooter />}>
              <Route path="/search" element={<MainSearchV2 />} />
              <Route path="/tintuc" element={<Tintuc />} />
            </Route>

          </Routes>
        </DataProvider>
      </Router>
    </div>
  );
}

function OutletHeaderFooter() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}


function Index() {
  return <h1>Trang chủ</h1>;
}
function NotFound() {
  return <h1>Link Not Found</h1>;
}



export default App;
