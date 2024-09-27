// 引入request
import request from "@/api/request";
import { TenantQuery, TenantInfo } from '@/entity/au/tenant'

/**
 * 分页接口
 */
export const getTenantPage = (params: TenantQuery) => {
  return request.get<Result>(`/carrot/auTenant/list`, {"params":{ ... params}})
}

/**
 * 删除接口
 */
export const removeTenant = (id: string) => {
  return request.delete<Result>(`/carrot/auTenant/remove/${id}`)
}

/**
 * 更新接口
 */
export const updateTenant = (params: TenantInfo) => {
  return request.put<Result>(`/carrot/auTenant/update`, params)
}

/**
 * 新增接口
 */
export const saveTenant = (params: TenantInfo) => {
  return request.post<Result>(`/carrot/auTenant/save`, params)
}