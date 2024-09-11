export default class Login {


  constructor(username: string, password: string) {
    this.username = username
    this.password = password
    this.rememberMe = 0
    this.loginType = 1
    this.tenantMark = ''
  }

  /**
   * 用户名
   */
  public username : string
  /**
   * 明文明码
   */
  public password : string
  /**
   * 加密密码 todo 实现
   */
  public passwordEnc : string|undefined
  /**
   * 验证码
   */
  public captcha : string|undefined
  /**
   * 验证码key
   */
  public captchaKey : string|undefined
  /**
   * 记住我
   */
  public rememberMe : number
  /**
   * 登录类型
   */
  public loginType : number
  /**
   * 租户标志
   */
  public tenantMark : string


}