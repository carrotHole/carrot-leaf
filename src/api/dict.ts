// 引入request
import request from "@/api/request";

/**
 * 获取字典类型列表
 * @param queryStr
 */
export const getDictList = (queryStr : string|undefined) => {
  return request.get<Result>(`/carrot/dictSys/list`, {"params":{queryStr:queryStr}})
}

/**
 * 获取字典内容列表
 * @param dictType
 */
export const getDictContentList = (dictType : string) => {
  return request.get<Result>(`/carrot/dictSys/listContentByType/${dictType}`)
}

/**
 * 新增字典
 * @param dict
 */
export const addDict = (dict : Dict) => {
  return request.post<Result>(`/carrot/dictSys/save`,dict)
}
/**
 * 更新字典
 * @param dict
 */
export const updateDict = (dict : Dict) => {
  return request.put<Result>(`/carrot/dictSys/update`,dict)
}

/**
 * 删除字典
 * @param dict
 */
export const deleteDict = (id : string) => {
  return request.delete<Result>(`/carrot/dictSys/remove/${id}`,)
}
