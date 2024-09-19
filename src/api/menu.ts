// 引入request
import request from "@/api/request";

// 请求接口/menu/page
export const menuPage = (page: Page, params: MenuQuery) => {
  return request.get<Result>(`/carrot/auMenu/page`, {"params":{...page, ... params}})
}