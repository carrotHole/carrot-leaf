interface Menu {
  // 菜单地址
  menuUrl?: string;

  // 组件路径
  componentPath?: string;
  // 菜单名称
  menuName?: string;

  // 权限编码
  permissionCode?: string;
  // 状态
  status?: number | null;

  // 级别
  level?: number | null;
  // 应用主键
  projectId?: string;

  // 菜单类型
  menuType?: number;
  // 父主键
  parentId?: string;

  // 租户主键
  tenantId?: string;

}

interface MenuResult extends Menu{

  // 图标
  icon?: string;

  // 状态值
  statusValue?: string;

  // 创建时间
  createdTime?: Date | null;

  // 子菜单集合
  children?: Menu[];

  // 排序
  sort?: number | null;

  // 菜单类型值
  menuTypeValue?: string;

  // 创建人
  createdBy?: string;

  // 主键
  id?: string;
}

interface MenuQuery extends Menu {

  // 创建时间
  createdTimeEnd?: Date | null;
  createdTimeStart?: Date | null;

}