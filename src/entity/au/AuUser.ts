/**
 * 用户信息
 */
export default class UserInfo {

  constructor() {
  }
  /**
   * 用户名
   */
  public username: string | undefined

  /**
   * 状态值
   */
  public statusValue: string | undefined
  /**
   * 是否为真实用户
   */
  public realUser: number | undefined
  /**
   * 是否真实用户值
   */
  public realUserValue: string | undefined
  /**
   * 主键
   */
  public id: string | undefined
  /**
   * 创建时间
   */
  public createdTime: Date | undefined
  /**
   * 创建方式
   */
  public createdType: number | undefined
  /**
   * 状态
   */
  public status: number | undefined
  /**
   * 排序
   */
  public sort: number | undefined
  /**
   * 租户主键
   */
  public tenantId: string | undefined
  /**
   * 部门主键
   */
  public deptId: string | undefined
  /**
   * 创建人
   */
  public createdBy: string | undefined
  /**
   * 昵称
   */
  public nickname: string | undefined
}