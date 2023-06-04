import { GrSearch } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import "./header.css";
import { useContext, useState, memo } from "react";
import { DataContext } from "../../../context/DataContext";
import { Link } from "react-router-dom";
const HeaderRender = memo((props) => {
  console.log("renderHeader");
  const handleClick = () => {
    props.setDataFilter((prevFilterList) => {
      if (prevFilterList.indexOf("&search") === -1) {
        return prevFilterList + "&search=" + inputValue;
      } else {
        return (
          prevFilterList.substring(0, prevFilterList.indexOf("&search")) +
          "&search=" +
          inputValue
        );
      }
    });
  };

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="header">
      <div className="topHeader">

            {localStorage.getItem("username") ? (
               <Link to="/admin">
               <button className="loginButton">
               <span>{localStorage.getItem("username")}</span>
               </button>
             </Link>
            ) : (
              <Link to="/dang-nhap">
               <button className="loginButton">
               <span>Đăng nhập</span>
               </button>
             </Link>
            )}
      </div>
      <div className="bottomHeader">
        <div className="leftHeader">
          <a href="/search">
            <img
              src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png"
              alt="Logo"
              className="imgTop"
            ></img>
          </a>
        </div>
        <div className="middleContainer">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Tìm kiếm"
              onChange={handleInputChange}
            ></input>
            <button className="searchBox" onClick={handleClick}>
              <GrSearch />
            </button>
            <Link to="/search">
              <span>Nâng cao</span>
            </Link>
          </div>
          <button className="dropdownMenu">
            <FaBars />
          </button>
        </div>
        <div className="rightHeader">
          <Link to="/tintuc">
            <span>Bản tin</span>
          </Link>
          <Link to="/gioithieu">
            <span>Giới thiệu</span>
          </Link>
          <Link to="tailieu">
            <span>Tài liệu</span>
          </Link>
          <Link className="yellowButton" to="lienhe">
            <span>Liên hệ</span>
          </Link>
        </div>
      </div>
    </div>
  );
});

const Header = () => {
  const { setDataFilter } = useContext(DataContext);
  return <HeaderRender setDataFilter={setDataFilter} />;
};

export default Header;
