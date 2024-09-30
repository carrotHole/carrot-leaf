import type { MenuTreeResult } from '@/entity/au/Menu'
import BeanUtil from '@/util/BeanUtil'

export class MenuUtil{

  public static filterMenu = (list: MenuTreeResult[]) => {
    if (!list){
      return []
    }
    const res = BeanUtil.deepCopy(list)
    for (let i = res.length - 1; i >= 0; i--) {
      const item = res[i]
      if (item.menuType === '3'){
        res.splice(i, 1)
        continue
      }
      if (item.children){
        MenuUtil.filterMenu(item.children)
      }
    }
    return res
  }
}