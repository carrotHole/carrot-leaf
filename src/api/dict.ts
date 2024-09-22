// 引入request
import request from "@/api/request";


export const getDictList = (queryStr : string) => {
  return request.get<Result>(`/carrot/dictSys/list`, {"params":{queryStr:queryStr}})
}

export const getDictContentList = (dictType : string) => {
  return request.get<Result>(`/carrot/dictSys/listContentByType/${dictType}`)
}