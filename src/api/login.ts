import request from "@/api/request";


const baseURL : string = "carrot"+ "/login";

// 登录
export const login = (body: Login) => {
  return request.post(`${baseURL}/username`, body);
};

/**
 * 获取token
 */
export const token  = (identity: string, deptId: string) => {
  return request.post(`${baseURL}/page`, {"identity":identity,"deptId":deptId}) ;
};

/**
 * 获取用户信息
 */
export const user  = () => {
  return request.post(`${baseURL}/user`) ;
};