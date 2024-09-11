/**
 * 用户信息
 */
interface User {

  /**
   * 用户名
   */
   username: string | undefined

  /**
   * 状态值
   */
   statusValue: string | undefined
  /**
   * 是否为真实用户
   */
   realUser: number | undefined
  /**
   * 是否真实用户值
   */
   realUserValue: string | undefined
  /**
   * 主键
   */
   id: string | undefined
  /**
   * 创建时间
   */
   createdTime: Date | undefined
  /**
   * 创建方式
   */
   createdType: number | undefined
  /**
   * 状态
   */
   status: number | undefined
  /**
   * 排序
   */
   sort: number | undefined
  /**
   * 租户主键
   */
   tenantId: string | undefined
  /**
   * 部门主键
   */
   deptId: string | undefined
  /**
   * 创建人
   */
   createdBy: string | undefined
  /**
   * 昵称
   */
   nickname: string | undefined
}