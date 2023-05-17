import { AiOutlineQuestionCircle, AiOutlineArrowDown } from "react-icons/ai";
import "./gridView.css";
function GridView({ items, total, onsetPage, currentPage }) {
  const sixItems = items.slice(0, 6);
  const otherItems = items.slice(6);
  return (
    <>
      <h2 className="total">
        <b>Kết quả: ({total})</b>
      </h2>
      <SixItems items={sixItems} />
      {otherItems.length > 0 && (
        <>
          <hr />
          <h2>
            <b>Kết quả khác</b>
          </h2>
          <div className="flexContainerSearch">
            {otherItems.map((item, id) => (
              <div key={id} className="flexItemSearch">
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
            ))}
          </div>
        </>
      )}
      {currentPage*18 < total && (
        <div className="buttonLoadMore">
          <a href="/" onClick={onsetPage}>
            Tải thêm
          </a>
        </div>
      )}
    </>
  );
}

function SixItems({ items }) {
  return (
    <>
      <div className="flexContainerSearch">
        {items.map((item, id) => (
          <div key={id} className="flexItemSearch">
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
        ))}
      </div>
    </>
  );
}
export default GridView;
