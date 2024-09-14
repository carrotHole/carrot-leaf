// 引入request
import request from "@/api/request";

// 请求接口/menu/page
export const menuPage = (params: any) => {
  return request.get(`$((Window as any).config["baseUri"])/menu/page`, params);
};