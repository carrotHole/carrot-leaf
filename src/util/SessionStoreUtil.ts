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
    return sessionStorage.getItem('token') as string
  }


  /**
   * 清空sessionStorage
   */
  static clear() :void {
    sessionStorage.clear()
  }
}