interface Login {

  /**
   * 用户名
   */
   username : string
  /**
   * 明文明码
   */
   password : string
  /**
   * 加密密码 todo 实现
   */
   passwordEnc : string|undefined
  /**
   * 验证码
   */
   captcha : string|undefined
  /**
   * 验证码key
   */
   captchaKey : string|undefined
  /**
   * 记住我
   */
   rememberMe : number
  /**
   * 登录类型
   */
   loginType : number
  /**
   * 租户标志
   */
   tenantMark : string


}