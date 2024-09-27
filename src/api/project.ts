// 引入request
import request from "@/api/request";
import { ProjectQuery, ProjectInfo } from '@/entity/au/Project'

/**
 * 分页接口
 */
export const getProjectPage = (page: Page, params: ProjectQuery) => {
  return request.get<Result>(`/carrot/auProject/page`, {"params":{...page, ... params}})
}

/**
 * 删除接口
 */
export const removeProject = (id: string) => {
  return request.delete<Result>(`/carrot/auProject/remove/${id}`)
}

/**
 * 更新接口
 */
export const updateProject = (params: ProjectInfo) => {
  return request.put<Result>(`/carrot/auProject/update`, params)
}

/**
 * 新增接口
 */
export const saveProject = (params: ProjectInfo) => {
  return request.post<Result>(`/carrot/auProject/save`, params)
}