
export class Dept {
  // 部门名称
  deptName: string | undefined
  // 部门类型
  deptType : string | undefined;
  // 状态
  status: number | undefined;
  // 租户主键
  tenantId: string | undefined
  // 创建时间
  createdTime: Date | null | undefined
}


export class DeptInfo extends Dept {
  // 排序
  sort: number | null | undefined
  // 上级部门主键
  parentId: string | undefined
  // 上级部门主键集合
  parentIds: string | undefined;
  // 创建人
  createdBy: string | undefined
  // 主键
  id: string | undefined
}

export class DeptResult extends DeptInfo {
  // 部门类型值
  deptTypeValue: string | undefined
  // 状态值
  statusValue: string | undefined
}

export class DeptTreeResult extends DeptResult {
  // 子菜单集合
  children: DeptTreeResult[] | undefined
}

export class DeptQuery extends Dept {
  // 创建时间
  createdTimeEnd: Date | null | undefined
  createdTimeBegin: Date | null | undefined
}