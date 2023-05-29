const endpoint = "https://loainguycap.ceid.gov.vn/api/"
const routerObject = {
    domain:"http://wlp.howizbiz.com",
    loaihientrang:"loaihientrangs",
    redbook:"danhmuccha?ma_danh_mucs[]=REDBOOK",
    iucn:"danhmuccha?ma_danh_mucs[]=IUCN",
    provinces:"provinces",
}

function getRoute(param, filter) {
    if(filter===undefined){
        filter="";
    }
    if(param === "domain"){
        return routerObject["domain"];
    }
    if(typeof(param) === "number"){
        return endpoint + "loaicongbo?paginate=true&page="+param+"&perpage=18"+filter;
        // return "https://loainguycap.ceid.gov.vn/api/loaicongbo?paginate=true&page="+param+"&perpage=18&loaihientrang_ids[]=3";
    }
    return endpoint + routerObject[param] + filter;
}


export default getRoute;