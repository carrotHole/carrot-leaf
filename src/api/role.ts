// 引入request
import request from "@/api/request";
import type { RoleInfo } from '@/entity/au/Role'
import { RoleQuery } from '@/entity/au/Role'

export const rolePage = (page: Page, params: RoleQuery) => {
  return request.get<Result>(`/carrot/auRole/page`, {"params":{...page, ... params}})
}

// 新增角色
export const roleSave = (params: RoleInfo) => {
  return request.post<boolean>(`/carrot/auRole/save`, params)
}
// 修改角色
export const roleUpdate = (params: RoleInfo) => {
  return request.put<boolean>(`/carrot/auRole/update`, params)
}
// 删除角色
export const roleRemove = (id: string) => {
  return request.delete<Result>(`/carrot/auRole/remove/${id}`)
}
// 删除角色
export const roleUpdateStatus = (data:{id:string, status:number}) => {
  return request.put<boolean>(`/carrot/auRole/updateStatus`,data)
}

// 获取角色绑定的菜单及数据范围信息
export const getRoleMenu = (id:string, projectId:string) => {
  return request.get<RoleInfo>(`/carrot/auRole/getRoleMenu/${id}/${projectId}`)
}