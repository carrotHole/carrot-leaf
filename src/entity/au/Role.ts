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

/**
 * 角色权限
 */
export class RoleAuthority{

  constructor() {
  }

  id:string | undefined
  roleId:string | undefined
  auMenu:number = 1
  auRangeList:Array<number> = [1]
}

/**
 * 角色权限范围
 */
export class RoleAuthorityResult {
  constructor() {
  }
  roleAuthority : RoleAuthority = new RoleAuthority()
  deptIdList : String[] = []
}

/**
 * 角色菜单权限
 */
export class RoleMenuAuthority{
  constructor() {
  }

  id:string | undefined
  roleId:string | undefined
  menuId:string | undefined
  auRange:number | undefined
  useDefault:number | undefined
}

/**
 * 角色菜单权限范围
 */
export class RoleMenuAuthorityResult {

  constructor() {
  }

  roleMenuAuthority: RoleMenuAuthority|undefined
  deptIdList : String[] | undefined

}

export class RoleAuthorityGroup extends RoleAuthorityResult{

  roleMenuAuthorityList : Array<RoleAuthorityResult>  = []

}