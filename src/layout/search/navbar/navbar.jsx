import { useContext } from "react";
import "./navbar.css";
import { BsFillGrid3X3GapFill, BsMap, BsBarChartLine } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { DataContext } from "../../../context/DataContext";
function RenderNavBar() {
  const { tab, setTab } = useContext(DataContext);
  console.log("render-navbar");
  function checkActive(param) {
    if (param === tab) {
      return "navbarButtonActive";
    }
  }
  return (
    <>
      <div className="navbar">
        <button
          className={"navbarButton " + checkActive(0)}
          onClick={() => setTab(0)}
        >
          <BsFillGrid3X3GapFill />
          <span className="navbarButtonText">LƯỚI</span>
        </button>
        <button
          className={"navbarButton " + checkActive(1)}
          onClick={() => setTab(1)}
        >
          <FaBars />
          <span className="navbarButtonText">BẢNG</span>
        </button>
        <button
          className={"navbarButton " + checkActive(2)}
          onClick={() => setTab(2)}
        >
          <BsMap />
          <span className="navbarButtonText">BẢN ĐỒ</span>
        </button>
        <button
          className={"navbarButton " + checkActive(3)}
          onClick={() => setTab(3)}
        >
          <BsBarChartLine />
          <span className="navbarButtonText">THỐNG KÊ</span>
        </button>
      </div>
    </>
  );
}
export default RenderNavBar;
