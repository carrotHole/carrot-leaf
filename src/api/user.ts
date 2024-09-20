// 引入request
import request from "@/api/request";

// 请求接口/menu/page
export const userPage = (page: Page, params: MenuQuery) => {
  return request.get<Result>(`/carrot/auUser/page`, {"params":{...page, ... params}})
}

// 新增用户
export const userSave = (params: User) => {
  return request.post<boolean>(`/carrot/auUser/save`, params)
}
// 修改用户
export const userUpdate = (params: User) => {
  return request.put<boolean>(`/carrot/auUser/update`, params)
}
// 删除用户
export const userRemove = (id: number) => {
  return request.delete<Result>(`/carrot/auUser/remove/${id}`)
}
// 删除用户
export const userUpdateStatus = (data:{id:string, status:number}) => {
  return request.put<boolean>(`/carrot/auUser/updateStatus`,data)
}