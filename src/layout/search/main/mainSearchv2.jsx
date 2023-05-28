import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import GridView from "./gridView";
import TableView from "./tableView";
import RenderNavBar from "../navbar/navbar";
import { UseDataContextSideBar } from "../sidebar/sidebar";

export const MainSearchV2 = () => {

  const { tab } = useContext(DataContext);
  let content = null;
  switch (tab) {
    case 0:
      content = <GridView />;
      // content = <GridViewV2/>
      break;
    case 1:
      content = <TableView />;
      break;
    default:
      break;
  }
  return (
    <>

        <RenderNavBar />
        <UseDataContextSideBar  />
        {content}
    </>
  );
};
