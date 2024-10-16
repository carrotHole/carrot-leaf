interface Result{
  code: number;
  msg: string;
  data: any;
  message: string
}

interface PageData<T>{
  records: T[]
  pageNumber: number
  pageSize: number
  totalPage: number
  totalRow: number
}