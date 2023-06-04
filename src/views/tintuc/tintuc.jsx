// import "./tintuc.css";
import tintuc from "./tintuc.module.css"
export const Tintuc = () => {
  return (
    <>
      <div className={tintuc.titleTintuc}>
        <h1>Danh sách bài viết</h1>
        <hr></hr>
        <div className={tintuc.count}>
          3/3
        </div>
      </div>
      ;
    </>
  );
};
