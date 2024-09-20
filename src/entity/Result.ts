interface Result{
  code: number;
  msg: string;
  data: any;
  message: string
}

interface PageData{
  records: any[]
  pageNumber: number
  pageSize: number
  totalPage: number
  totalRow: number
}