// 引入request
import request from "@/api/request";
import type { RoleInfo } from '@/entity/au/Role'
import { RoleAuthorityResult, RoleMenuAuthorityResult, RoleQuery } from '@/entity/au/Role'

export const rolePage = (page: Page, params: RoleQuery) => {
  return request.get<Result>(`/carrot/auRole/page`, {"params":{...page, ... params}})
}

// 新增角色
export const roleSave = (data: RoleInfo) => {
  return request.post<Result>(`/carrot/auRole/save`, data)
}
// 修改角色
export const roleUpdate = (data: RoleInfo) => {
  return request.put<Result>(`/carrot/auRole/update`, data)
}
// 删除角色
export const roleRemove = (id: string) => {
  return request.delete<Result>(`/carrot/auRole/remove/${id}`)
}
// 删除角色
export const roleUpdateStatus = (data:{id:string, status:number}) => {
  return request.put<Result>(`/carrot/auRole/updateStatus`,data)
}

// ----------- 权限相关 ------------

// 获取角色绑定的菜单及数据范围信息
export const getAuthority = (id:string) => {
  return request.get<Result>(`/carrot/auRole/getAuthority/${id}`)
}

// 角色新增授权
export const saveAuthority = (data: RoleAuthorityResult) => {
  return request.post<Result>(`/carrot/auRole/saveAuthority`, data)
}

// 角色更新授权
export const updateAuthority = (data: RoleAuthorityResult) => {
  return request.put<Result>(`/carrot/auRole/updateAuthority`, data)
}

// 角色菜单新增授权
export const saveMenuAuthority = (data: RoleMenuAuthorityResult) => {
  return request.post<Result>(`/carrot/auRole/saveMenuAuthority`, data)
}

// 角色菜单更新授权
export const updateMenuAuthority = (data: RoleMenuAuthorityResult) => {
  return request.put<Result>(`/carrot/auRole/updateMenuAuthority`, data)
}

// 角色菜单删除授权
export const removeMenuAuthority = (roleId: string) => {
  return request.delete<Result>(`/carrot/auRole/removeMenuAuthority/${roleId}`)
}