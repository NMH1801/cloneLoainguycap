import { useState, useEffect, createContext } from "react";
import {getDataFromApi} from "../ultis/getDataFromApi";
import {getRoute} from "../const/api";
import { debounce } from "lodash";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // console.log("render-DataProvider");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFilter, setDataFilter] = useState("");
  const [tab, setTab] = useState(0);

  const onsetPage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    if(currentPage===1){
    setLoadingFirst(true);
  }

    setLoadingMore(true);

    const fetchData = async () => {
      try {
        // setDataFilter(convertObject(filterList));
        const Data = await getDataFromApi(currentPage, dataFilter);
        const count = Data.pagination.total;
        setLoadingFirst(false);

        setLoadingMore(false);
        setTotal(count);
        const newData = [];
        Data.list.forEach((item) => {
          let loai_hien_trang = null;
          let sach_dos = null;
          let iucns = null;
          let images = getRoute("domain") + "/static/img/image4.5aecb9b5.png";

          if (item.loai_hien_trang) {
            loai_hien_trang = item.loai_hien_trang.ten;
          }
          if (item.sach_dos.length > 0) {
            sach_dos = item.sach_dos[0].ma_danh_muc;
          }
          if (item.iucns.length > 0) {
            iucns = item.iucns[0].ma_danh_muc;
          }
          if (item.attachments.length > 0) {
            images = getRoute("domain") + item.attachments[0].path;
          }
          newData.push({
            name: item.ten,
            ten_khoa_hoc: item.ten_khoa_hoc,
            images: images,
            kingdom: item.kingdom.ten,
            phylumn: item.phylumn.ten,
            loai_hien_trang: loai_hien_trang,
            sach_dos: sach_dos,
            iucns: iucns,
          });
        });

        if (currentPage === 1) {
          setData(() => [...newData]);
        } else {
          setData((prevData) => [...prevData, ...newData]);
        }
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    const debouncedData = debounce(fetchData, 500);
    debouncedData();
    return () => {
      debouncedData.cancel(); // Hủy bỏ debounce khi component bị unmount
    };
  }, [currentPage, dataFilter]);

  return (
    <DataContext.Provider
      value={{
        data,
        total,
        currentPage,
        setCurrentPage,
        onsetPage,
        loadingFirst,
        tab,
        setTab,
        setDataFilter,
        loadingMore,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
