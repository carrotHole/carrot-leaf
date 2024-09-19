// 引入request
import request from "@/api/request";

// 请求接口/menu/page
export const userPage = (page: Page, params: MenuQuery) => {
  return request.get<Result>(`/carrot/auUser/page`, {"params":{...page, ... params}})
}