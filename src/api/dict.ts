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
 * @param id
 */
export const deleteDict = (id : string) => {
  return request.delete<Result>(`/carrot/dictSys/remove/${id}`,)
}

/**
 * 新增字典内容
 * @param dictContent
 */
export const addDictContent = (dictContent : DictContent) => {
  return request.post<Result>(`/carrot/dictSys/saveContent`,dictContent)
}
/**
 * 更新字典内容
 * @param dictContent
 */
export const updateDictContent = (dictContent : DictContent) => {
  return request.put<Result>(`/carrot/dictSys/updateContent`,dictContent)
}

/**
 * 删除字典内容
 * @param id
 */
export const deleteDictContent = (id : string) => {
  return request.delete<Result>(`/carrot/dictSys/removeContent/${id}`,)
}
/**
 * 获取字典内容
 * @param type
 */
export const listContentByType = (type : string) => {
  return request.get<Result>(`/carrot/listContentByType/${type}`,)
}

