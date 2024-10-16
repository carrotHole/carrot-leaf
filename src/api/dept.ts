import request from "@/api/request"
import { DeptInfo } from '@/entity/au/Dept'

/**
 * 获取部门树
 */
export const getDeptTree = () => {
  return request.get<Result>(`/carrot/auDept/getTree`)
}

/**
 * 新增组织机构
 */
export const saveDept = (data: DeptInfo) => {
  return request.post<Result>(`/carrot/auDept/save`, data)
}

/**
 * 更新组织机构
 */
export const updateDept = (data: DeptInfo) => {
  return request.put<Result>(`/carrot/auDept/update`, data)
}

/**
 * 删除组织机构
 */
export const removeDept = (id: string) => {
  return request.delete<Result>(`/carrot/auDept/remove/${id}`)
}