import "./sidebar.css";
import {
  AiFillQuestionCircle,
  AiOutlineArrowDown,
  AiOutlineArrowRight,
} from "react-icons/ai";
import {getDataFromApi} from "../../../ultis/getDataFromApi";
import React, {
  useContext,
  useEffect,
  useState,
  memo,
  useCallback,
} from "react";
import { DataContext } from "../../../context/DataContext";

function convertObject(object) {
  let result = [];
  for (let key in object) {
    object[key].forEach((item) => {
      result.push(`&${key}=${item}`);
    });
  }
  return result.join("");
}

export const UseDataContextSideBar = () => {
  const { setCurrentPage, setDataFilter } = useContext(DataContext);
  return (
    <RenderSideBarFunction
      setCurrentPage={setCurrentPage}
      setDataFilter={setDataFilter}
    />
  );
};

export const RenderSideBarFunction = memo((props) => {
  console.log("render-father");
  const [filterList, setFilterList] = useState({
    "loaihientrang_ids[]": [],
    "province_ids[]": [],
    "sach_do_ids[]": [],
    "iucn_ids[]": [],
    search: [],
  });
  const onSetFilter = useCallback(
    (control) => (e) => {
      const isChecked = e.target.checked;
      const value = e.target.value;
      if (isChecked) {
        setFilterList((prevFilterList) => ({
          ...prevFilterList,
          [control]: [...prevFilterList[control], value],
        }));
      } else {
        setFilterList((prevFilterList) => ({
          ...prevFilterList,
          [control]: prevFilterList[control].filter((item) => item !== value),
        }));
      }
    },
    [setFilterList]
  );

  useEffect(() => {
    const filter = convertObject(filterList);
    props.setDataFilter((prevFilterList) => {
      if (prevFilterList.indexOf("&search") === -1) {
        return filter;
      } else {
        return (
          filter +
          prevFilterList.substring(prevFilterList.lastIndexOf("&search"))
        );
      }
    });
    props.setCurrentPage(1);
  }, [filterList, props]);

  return <RenderSideBar onSetFilter={onSetFilter} filterList={filterList} />;
});

const RenderSideBar = memo(({ onSetFilter , filterList}) => {
  console.log("render-sidebar");
  const [data, setData] = useState([]);
  useEffect(() => {
    const returnData = async () => {
      try {
        const dataList = [];
        const loaihientrangList = await getDataFromApi("loaihientrang");
        const newLoaihientrang = [];
        loaihientrangList.forEach((item) => {
          newLoaihientrang.push({
            id: item.id,
            ten: item.ten,
          });
        });
        dataList.push(newLoaihientrang);

        const provincesList = await getDataFromApi("provinces");
        const newProvinces = [];
        provincesList.forEach((item) => {
          newProvinces.push({
            id: item.id,
            ten: item.name,
          });
        });
        dataList.push(newProvinces);

        const redbookList = await getDataFromApi("redbook");
        const newRedbook = [];
        redbookList[0].childs.forEach((item) => {
          newRedbook.push({
            id: item.id,
            ten: item.ten,
            ma_danh_muc: item.ma_danh_muc,
          });
        });
        dataList.push(newRedbook);

        const iucnList = await getDataFromApi("iucn");
        const newiucnList = [];
        iucnList[0].childs.forEach((item) => {
          newiucnList.push({
            id: item.id,
            ten: item.ten,
            ma_danh_muc: item.ma_danh_muc,
          });
        });
        dataList.push(newiucnList);
        setData(dataList);
        console.log(dataList);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    returnData();
  }, []);
  return (

    <Render data={data} onSetFilter={onSetFilter} filterList={filterList} />
  );
});

const Render = ({ data, onSetFilter,filterList={} }) => {

  console.log("render");
  const formatIUCNShow = (item)=>{
    return `${item.ma_danh_muc} - ${item.ten}`
  }
  const formatProvincesShow = (item) =>{
    return `${item.ten}`
  }
  return (
    <>
      <div className="sidebarContainer">
        BỘ LỌC
        <AiFillQuestionCircle
          style={{
            fontSize: "18px",
            marginLeft: "10px",
          }}
        />
        <hr className="hrSideBar" />

        {/* IUCN */}
        <SiderBarFilter name="Loài hiện trạng" items={data[0]} formatShow={formatProvincesShow} onSetValue={onSetFilter("loaihientrang_ids[]")} value={filterList['loaihientrang_ids[]']} />
        <SiderBarFilter name="Địa giới hành chính" items={data[1]} formatShow={formatProvincesShow} onSetValue={onSetFilter("province_ids[]")} value={filterList['province_ids[]']} />
        <SiderBarFilter name="Sách đỏ" items={data[2]} formatShow={formatIUCNShow} onSetValue={onSetFilter("sach_do_ids[]")} value={filterList['sach_do_ids[]']} />
        <SiderBarFilter name="IUCN" items={data[3]} formatShow={formatIUCNShow} onSetValue={onSetFilter("iucn_ids[]")} value={filterList['iucn_ids[]']} />
      </div>
    </>
  );
};

export default Render;
const SiderBarFilter = memo(({ value=[], items = [], formatShow = ()=>'', name,onSetValue }) => {
  console.log("log");
  let [show, setShow] = useState(false)
  return <ul className="ulSideBar">
    <p onClick={() => setShow(!show)}>
      {show ? (
        <AiOutlineArrowDown />
      ) : (
        <AiOutlineArrowRight />
      )}
      {name}
    </p>
    {show &&
      items.length > 0 &&
      items.map((item) => (
        <label key={`iucn-${item.id}`} htmlFor={`iucn-${item.id}`}>
          <li>
            <input
              id={`iucn-${item.id}`}
              type="checkbox"
              value={item.id}
              checked={value.includes(''+item.id)}
              onChange={onSetValue}
            />
            {formatShow(item)}
          </li>
        </label>
      ))}
  </ul>
})