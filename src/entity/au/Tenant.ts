export class Tenant{
  id: string | undefined
  tenantName: string | undefined
  tenantMark: string | undefined
  linkUser: string | undefined
  linkCellphone: string | undefined
  createdTime : Date | undefined
}

export class TenantQuery extends Tenant{
  createdTimeEnd?: Date | null
  createdTimeBegin?: Date | null
}

export class TenantInfo extends Tenant{
  createdBy: string | undefined
  sort: number | undefined
}

export class TenantResult extends Tenant{
  statusValue: string | undefined
}