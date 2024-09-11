import router from '@/router'

/**
 * sessionStorage工具类
 */
export default class SessionStoreUtil {

  /**
   * 设置sessionStorage
   * @param key key
   * @param value value
   */
  static set(key: string, value: any) : void {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 获取sessionStorage
   * @param key key
   */
  static get(key: string) : any{
    return JSON.parse(sessionStorage.getItem(key) as string)
  }

  /**
   * 设置token
   * @param token token
   */
  static setToken(token: string) :void {
    sessionStorage.setItem('token', token)
  }

  /**
   * 获取token
   */
  static getToken() : string {
    // todo 如果token为null ，则跳转登录页面
    const token = sessionStorage.getItem('token')

    if (token == null) {
      // 跳转登录页
      router.push('/login')
      return
    }
    return token as string
  }


  /**
   * 清空sessionStorage
   */
  static clear() :void {
    sessionStorage.clear()
  }
}