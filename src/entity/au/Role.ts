class Role{

  /**
   * 角色名
   */
  roleName: string | undefined;

  /**
   * 应用主键
   */
  projectId: string | undefined;

  /**
   * 部门主键
   */
  deptId: string | undefined;


  /**
   * 状态
   */
  status: number | undefined;

  /**
   * 备注
   */
  remark: string | undefined;

  /**
   * 菜单范围
   */
  menuRange: number | undefined;

}

export class RoleQuery extends Role{
  createdTimeBegin?: Date | null;
  createdTimeEnd?: Date | null;
}
export class RoleInfo extends Role{

  constructor(status= 0, menuRange: number=0) {
    super()
    this.status = status
    this.menuRange = menuRange
  }

  /**
   * 主键
   */
  id : string | undefined;
  /**
   * 排序
   */
  sort: number | undefined;
  /**
   * 租户主键
   */
  tenantId: string | undefined
  /**
   * 创建时间
   */
  createdTime: Date | null | undefined
  /**
   * 创建人
   */
  createdBy: string | undefined
}

export class RoleResult extends RoleInfo{
  statusValue: string | undefined;
}