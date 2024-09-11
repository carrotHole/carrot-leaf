// 引入request
import request from "@/utils/request";
// 请求接口/menu/page
export const menuPage = (params: any) => {
  return request.get("/menu/page", params);
};