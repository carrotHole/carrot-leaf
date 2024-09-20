// 引入request
import request from "@/api/request";

// 请求接口/menu/page
export const userPage = (page: Page, params: MenuQuery) => {
  return request.get<Result>(`/carrot/auUser/page`, {"params":{...page, ... params}})
}

// 新增用户
export const userAdd = (params: User) => {
  return request.post<Result>(`/carrot/auUser/save`, params)
}
// 修改用户
export const userUpdate = (params: User) => {
  return request.put<Result>(`/carrot/auUser/update`, params)
}