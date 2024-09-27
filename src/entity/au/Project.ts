 class Project {

  /**
   * 应用名称
   */
  projectName: string | undefined

  /**
   * 状态
   */
  status: number | undefined

  /**
   * 创建时间
   */
  createdTime: Date | undefined

}

 export class ProjectQuery extends Project {
  /**
   * 创建时间
   */
  createdTimeEnd?: Date | null;
  createdTimeBegin?: Date | null;
}

 export class ProjectResult extends Project {
  /**
   * 主键
   */
  id: string | undefined

  /**
   * 创建人
   */
  createdBy: string | undefined
  /**
   * 状态值
   */
  statusValue: string | undefined
  /**
   * 排序
   */
  sort: number | undefined
}

export class ProjectInfo extends Project {
  /**
   * 主键
   */
   id: string | undefined

  /**
   * 创建人
   */
   createdBy: string | undefined

  /**
   * 排序
   */
   sort: number | undefined


  constructor(status:number) {
    super()
    this.status = status
  }

}