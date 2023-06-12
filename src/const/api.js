import { FaUnderline } from "react-icons/fa";

const endpoint = "http://wlp.howizbiz.com/api/"
const routerObject = {
    domain:"http://wlp.howizbiz.com",
    loaihientrang:"loaihientrangs",
    redbook:"danhmuccha?ma_danh_mucs[]=REDBOOK",
    iucn:"danhmuccha?ma_danh_mucs[]=IUCN",
    provinces:"provinces",
    user:"users",
    roles:"roles",
    me:"me",
    userpost:"users",
}

export function getRoute(param, filter) {
    if(filter===undefined){
        filter="";
    }

    if(param === "domain"){
        return routerObject["domain"];
    }
    if(typeof(param) === "number"){
        return endpoint + "loaicongbo?paginate=true&page="+param+"&perpage=18"+filter;
    }
    return endpoint + routerObject[param] + filter;
}

export const  getDataAdmin=(param,array, filter) =>{
    if(filter===undefined){
        filter="";
    }
    if(array ===undefined){
        return endpoint + routerObject[param];
    }
        return endpoint + routerObject[param] + "?paginate=true&page="+array[0]+"&perpage="+array[1]+"&with=roles,createdBy,provinces";
}

// export default getRoute;