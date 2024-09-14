import request from '@/api/request'

const baseURL: string = 'carrot' + '/login'

// 登录
export const loginRequest = (body: Login) => {
  return request.post(`${baseURL}/username`, body)
}

/**
 * 获取token
 */
export const getToken = (identifyKey: string, deptId: string) => {
  return request.get(`${baseURL}/token?identifyKey=${identifyKey}&deptId=${deptId}`)
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request.post(`${baseURL}/user`)
}

/**
 * 退出
 */
export const logoutRequest = () => {
  return request.post(`${baseURL}/logout`)
}
