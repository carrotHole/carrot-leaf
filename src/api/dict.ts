// 引入request
import request from "@/api/request";
import DictClassConstant from '@/constant/DictClassConstant'
import type { DictContent } from '@/entity/sys/DictContent'

const pathFormat = (dictClass: string) => {
  return DictClassConstant.SYS === dictClass ? 'Sys':''
}

/**
 * 获取字典类型列表
 * @param queryStr
 */
export const getDictList = (queryStr : string|undefined, dictClass:string) => {
  return request.get<Result>(`/carrot/dict${pathFormat(dictClass)}/list`, {"params":{queryStr:queryStr}})
}

/**
 * 获取字典内容列表
 * @param dictType
 */
export const getDictContentList = (dictType : string, dictClass:string) => {
  return request.get<Result>(`/carrot/dict${pathFormat(dictClass)}/listContentByType/${dictType}`)
}

/**
 * 新增字典
 * @param dict
 */
export const addDict = (dict : Dict, dictClass:string) => {
  return request.post<Result>(`/carrot/dict${pathFormat(dictClass)}/save`,dict)
}
/**
 * 更新字典
 * @param dict
 */
export const updateDict = (dict : Dict, dictClass:string) => {
  return request.put<Result>(`/carrot/dict${pathFormat(dictClass)}/update`,dict)
}

/**
 * 删除字典
 * @param id
 */
export const deleteDict = (id : string, dictClass:string) => {
  return request.delete<Result>(`/carrot/dict${pathFormat(dictClass)}/remove/${id}`,)
}

/**
 * 新增字典内容
 * @param dictContent
 */
export const addDictContent = (dictContent : DictContent, dictClass:string) => {
  return request.post<Result>(`/carrot/dict${pathFormat(dictClass)}/saveContent`,dictContent)
}
/**
 * 更新字典内容
 * @param dictContent
 */
export const updateDictContent = (dictContent : DictContent, dictClass:string) => {
  return request.put<Result>(`/carrot/dict${pathFormat(dictClass)}/updateContent`,dictContent)
}

/**
 * 删除字典内容
 * @param id
 */
export const deleteDictContent = (id : string, dictClass:string) => {
  return request.delete<Result>(`/carrot/dict${pathFormat(dictClass)}/removeContent/${id}`,)
}
/**
 * 获取字典内容
 * @param type
 */
export const listContentByType = (type : string, dictClass:string) => {
  return request.get<Result>(`/carrot/dict${pathFormat(dictClass)}/listContentByType/${type}`,)
}

