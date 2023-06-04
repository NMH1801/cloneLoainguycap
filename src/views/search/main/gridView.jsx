import { AiOutlineQuestionCircle, AiOutlineArrowDown } from "react-icons/ai";
import React from "react";
import "./gridView.css";
import "./mainSearch.css";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
function GridView() {
  const { data, currentPage, onsetPage, total, loadingFirst, loadingMore } = useContext(DataContext);
  console.log("render-gridView");
  let items = data;
  const sixItems = items.slice(0, 6);
  const otherItems = items.slice(6);
  if(loadingFirst){
    return <div className="main container-loader"><div className="loader"></div></div>
  }
  return (
    <div className="main">
      <h2 className="total">
        <b>Kết quả: ({total})</b>
      </h2>
      <div className="flexContainerSearch">
        {sixItems.map((item, index) => (
          <SixItems key={index} item={item} />
        ))}
      </div>
      {otherItems !== null && otherItems.length !== 0 ? (
        <div>
          <hr className="hrGridView" />
          <h2>
            <b>Kết quả khác</b>
          </h2>
          <div className="flexContainerSearch">
            {
                
                  otherItems.map((item, index) => (
                    <OtherItems key={index} item={item} />
                  ))
                
            }
           
          </div>
          {loadingMore && <div className="container-loader"><div className="loader"></div></div>}
        </div>
      ) : null}
      <div className="buttonLoadMore">
        {currentPage * 18 < total && !loadingMore && (
          <a href="/" onClick={onsetPage}>
            Tải thêm
          </a>
        )}
      </div>
    </div>
  );
}


const sixItem = ({ item }) => {
  return (
    <div className="flexItemSearch">
      <div className="flexItemContent">
        <div
          style={{
            backgroundImage: `url(${item.images})`,
          }}
          className="flexImgSearch"
        ></div>
        <div className="flexMiddleSearch">
          <p>
            {item.kingdom} - {item.phylumn}
          </p>
          <p>
            <b>{item.name}</b>
          </p>
          <p>
            <i>{item.ten_khoa_hoc}</i>
          </p>
        </div>
        <div className="flexBottomSearch">
          {item.loai_hien_trang == null ? (
            <>
              <div className="leftFlexBottomSearch">
                <AiOutlineQuestionCircle
                  style={{
                    color: "rgb(208, 213, 214)",
                  }}
                />
                <span>Chưa xác định</span>
              </div>
            </>
          ) : (
            <>
              <div className="leftFlexBottomSearch">
                <AiOutlineArrowDown
                  style={{
                    color: "red",
                  }}
                />

                <span>Giảm dần</span>
              </div>
            </>
          )}
          <div className="rightFlexBottomSearch">
            {item.sach_dos != null && item.iucns != null ? (
              <>
                <div className="iconFlexBottomSearch pink">{item.sach_dos}</div>
                <div className="iconFlexBottomSearch orange">{item.iucns}</div>
              </>
            ) : item.sach_do != null && item.iucns == null ? (
              <div className="iconFlexBottomSearch pink">{item.sach_dos}</div>
            ) : item.sach_do == null && item.iucns != null ? (
              <div className="iconFlexBottomSearch pink">{item.iucns}</div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const otherItem = ({ item }) => {
  return (
    <div className="flexItemSearch">
      <div className="flexItemContent">
        <div className="flexMiddleSearch">
          <p>
            {item.kingdom} - {item.phylumn}
          </p>
          <p>
            <b>{item.name}</b>
          </p>
          <p>
            <i>{item.ten_khoa_hoc}</i>
          </p>
        </div>
        <div className="flexBottomSearch">
          {item.loai_hien_trang == null ? (
            <>
              <div className="leftFlexBottomSearch">
                <AiOutlineQuestionCircle
                  style={{
                    color: "rgb(208, 213, 214)",
                  }}
                />
                <span>Chưa xác định</span>
              </div>
            </>
          ) : (
            <>
              <div className="leftFlexBottomSearch">
                <AiOutlineArrowDown />

                <span>Giảm dần</span>
              </div>
            </>
          )}
          <div className="rightFlexBottomSearch">
            {item.sach_dos != null && item.iucns != null ? (
              <>
                <div className="iconFlexBottomSearch pink">
                  {item.sach_dos}
                </div>
                <div className="iconFlexBottomSearch orange">
                  {item.iucns}
                </div>
              </>
            ) : item.sach_do != null && item.iucns == null ? (
              <div className="iconFlexBottomSearch pink">
                {item.sach_dos}
              </div>
            ) : item.sach_do == null && item.iucns != null ? (
              <div className="iconFlexBottomSearch pink">
                {item.iucns}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




const SixItems = React.memo(sixItem);
const OtherItems = React.memo(otherItem);
export default GridView;
