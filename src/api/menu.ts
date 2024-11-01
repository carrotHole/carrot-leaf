// 引入request
import request from "@/api/request";
import type { MenuInfo } from '@/entity/au/Menu'

/**
 * 获取应用下所有菜单树
 * @param projectId
 */
export const getMenuTree = (projectId: string) => {
  return request.get<Result>(`/carrot/auMenu/getTree/${projectId}`)
}


/**
 * 获取应用下所有菜单树
 * @param projectId
 */
export const getCatalogMenuTree = (projectId: string) => {
  return request.get<Result>(`/carrot/auMenu/catalogMenuTree/${projectId}`)
}


/**
 * 新增菜单
 */
export const saveMenu = (data: MenuInfo) => {
  return request.post<Result>(`/carrot/auMenu/save`, data)
}

/**
 * 更新菜单
 */
export const updateMenu = (data: MenuInfo) => {
  return request.put<Result>(`/carrot/auMenu/update`, data)
}

/**
 * 删除菜单
 */
export const removeMenu = (id: string) => {
  return request.delete<Result>(`/carrot/auMenu/remove/${id}`)
}