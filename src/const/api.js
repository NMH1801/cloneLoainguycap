const endpoint = "http://wlp.howizbiz.com/api/";
const routerObject = {
  domain: "http://wlp.howizbiz.com",
  loaihientrang: "loaihientrangs",
  redbook: "danhmuccha?ma_danh_mucs[]=REDBOOK",
  iucn: "danhmuccha?ma_danh_mucs[]=IUCN",
  provinces: "provinces",
  user: "users",
  roles: "roles",
  me: "me",
  userpost: "users",
  logout: "logout",
};

export function getRoute(param, filter) {
  if (filter === undefined) {
    filter = "";
  }

  if (param === "domain") {
    return routerObject["domain"];
  }
  if (typeof param === "number") {
    return (
      endpoint +
      "loaicongbo?paginate=true&page=" +
      param +
      "&perpage=18" +
      filter
    );
  }
  return endpoint + routerObject[param] + filter;
}

export const getDataAdmin = (param, array, filter, sort, sign) => {
  if (array === undefined) {
    return endpoint + routerObject[param];
  }
  let sortList = "&sort=";
  if (sort !== undefined) {
    let count = 3;

    let newSortArray = [...sort];
    let mapping = ["name,", "username,", "inactive,", "created_at,"];
    for (let i = 0; i < newSortArray.length; i++) {
      if (sort[i] !== 0) {
        newSortArray[sort[i] - 1] = mapping[i];
      } else {
        newSortArray[count] = "";
        count--;
      }
    }
    for (let i = 0; i < sign.length; i++) {
      if (sign[i] === 1) {
        newSortArray[i] = "-" + newSortArray[i];
      }
    }
    sortList = sortList+ newSortArray.join("");
  }

  if (sortList === "sort=") {
    sortList = "";
  }
  let filterlist = "";
  if (filter.search != null) {
    filterlist += "&search=" + filter.search;
  }
  if (filter.dateStart != null) {
    filterlist += "&date_start=" + filter.dateStart;
  }
  if (filter.dateEnd != null) {
    filterlist += "&date_end=" + filter.dateEnd;
  }
  if (filter.inactive != null) {
    filterlist += "&inactive=" + filter.inactive;
  }
  if (filter.filterRole != null) {
    filterlist += "&role_id=" + filter.filterRole;
  }

  return (
    endpoint +
    routerObject[param] +
    "?paginate=true&page=" +
    array[0] +
    "&perpage=" +
    array[1] +
    sortList +
    "&with=roles,createdBy,provinces" +
    filterlist
  );
};

// export default getRoute;
