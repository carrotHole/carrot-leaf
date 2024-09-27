/**
 * 用户信息
 */
interface User {

  /**
   * 用户名
   */
   username: string | undefined

  /**
   * 是否为真实用户
   */
   realUser: number | undefined

  /**
   * 创建方式
   */
   createdType: number | undefined
  /**
   * 状态
   */
   status: number | undefined

  /**
   * 租户主键
   */
   tenantId: string | undefined
  /**
   * 部门主键
   */
   deptId: string | undefined

  /**
   * 昵称
   */
   nickname: string | undefined
}



interface UserInfo extends User{
  /**
   * 主键
   */
  id: string | undefined

  /**
   * 排序
   */
  sort: number | undefined

  /**
   * 创建时间
   */
  createdTime: Date | undefined

  /**
   * 创建人
   */
  createdBy: string | undefined
}

interface UserQuery extends User {
  /**
   * 创建时间
   */
   createdTimeEnd?: Date | null;
   createdTimeStart?: Date | null;
}

interface UserResult extends User{
  /**
   * 主键
   */
  id: string | undefined
  /**
   * 创建时间
   */
  createdTime: Date | undefined

  /**
   * 创建人
   */
  createdBy: string | undefined

  /**
   * 排序
   */
  sort: number | undefined

  /**
   * 状态值
   */
  statusValue: string | undefined

  /**
   * 是否真实用户值
   */
  realUserValue: string | undefined
}