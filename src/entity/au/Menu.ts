export class Menu {
  // 菜单地址
  menuUrl: string | undefined
  // 组件路径
  componentPath: string | undefined
  // 菜单名称
  menuName: string | undefined
  // 权限编码
  permissionCode: string | undefined
  // 状态
  status: number | null | undefined
  // 级别
  level: number | null | undefined
  // 应用主键
  projectId: string | undefined
  // 菜单类型
  menuType: number | undefined
  // 父主键
  parentId: string | undefined
  // 租户主键
  tenantId: string | undefined
  // 创建时间
  createdTime: Date | null | undefined
}

export class MenuInfo extends Menu {
  // 图标
  icon: string | undefined
  // 排序
  sort: number | null | undefined
  // 创建人
  createdBy: string | undefined
  // 主键
  id: string | undefined
}

export class MenuResult extends MenuInfo {
  // 菜单类型值
  menuTypeValue: string | undefined
  // 状态值
  statusValue: string | undefined
}

export class MenuTreeResult extends MenuResult {
  // 子菜单集合
  children: MenuTreeResult[] | undefined
}

export class MenuQuery extends Menu {
  // 创建时间
  createdTimeEnd: Date | null | undefined
  createdTimeBegin: Date | null | undefined
}
