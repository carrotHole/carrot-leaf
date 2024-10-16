import  { DeptTreeResult } from '@/entity/au/Dept'
import { getDeptTree } from '@/api/dept'
import DeptConstant from '@/constant/DeptConstant'


export class DeptUtil {

  private static deptTreeList: DeptTreeResult[] = []

  public static getDeptTreeList = async (refresh:boolean=false) => {
    if (!refresh && DeptUtil.deptTreeList && DeptUtil.deptTreeList.length>0){
      return DeptUtil.deptTreeList
    }
    const res = await getDeptTree()
    DeptUtil.deptTreeList = res.data
    return DeptUtil.deptTreeList
  }

  public static formatSelectorTree = async () => {

    const list = await DeptUtil.getDeptTreeList()
    const rootDept = new DeptTreeResult()
    rootDept.children = list
    rootDept.deptName = DeptConstant.ROOT_DEPT_NAME
    rootDept.id = DeptConstant.ROOT_DEPT_ID
    return [rootDept]
  }
}