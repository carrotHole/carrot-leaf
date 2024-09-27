export class Tenant{
  id: string | undefined
  tenantName: string | undefined
  tenantMark: string | undefined
  linkUser: string | undefined
  linkCellphone: string | undefined
  createdTime : Date | undefined
  status: number | undefined
}

export class TenantQuery extends Tenant{
  createdTimeEnd?: Date | null
  createdTimeBegin?: Date | null
}

export class TenantInfo extends Tenant{
  createdBy: string | undefined


  constructor(status= 0 ) {
    super()
    this.status = status
  }
}

export class TenantResult extends Tenant{
  statusValue: string | undefined
}