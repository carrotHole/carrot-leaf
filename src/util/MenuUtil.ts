import { MenuTreeResult } from '@/entity/au/Menu'
import BeanUtil from '@/util/BeanUtil'
import MenuConstant from '@/constant/MenuConstant'
import { getCatalogMenuTree, getMenuTree } from '@/api/menu'


export class MenuUtil {

  private static menuTreeMap: Map<string, MenuTreeResult[]> = new Map<string, MenuTreeResult[]>()
  private static catalogMenuTree: Map<string, MenuTreeResult[]> = new Map<string, MenuTreeResult[]>()

  public static getMenuTreeList = async (projectId: string, refresh: boolean=false) => {
    const menuList = MenuUtil.menuTreeMap.get(projectId)
    if (!refresh && menuList && Array.isArray(menuList) && menuList.length > 0) {
      return menuList
    }

    const res = await getMenuTree(projectId)
    MenuUtil.menuTreeMap.set(projectId, res.data)
    return res.data
  }

  /**
   * 添加顶级菜单,并删除按钮
   * @param projectId
   */
  public static formatSelectorTree = async (projectId:string) => {
    const list = await MenuUtil.getMenuTreeList(projectId)
    return await MenuUtil.formatTree(list)
  }

  private static formatTree = async (list:MenuTreeResult[]) => {

    if (!list){
      return []
    }

    const res = BeanUtil.deepCopy(list)
    for (let i = res.length - 1; i >= 0; i--) {
      const item = res[i]
      if (item.menuType === '3') {
        res.splice(i, 1)
        continue
      }
      if (item.children) {
        MenuUtil.formatTree(item.children)
      }
    }
    const rootMenu = new MenuTreeResult(0)
    rootMenu.menuName = MenuConstant.ROOT_MENU_NAME
    rootMenu.children = res
    rootMenu.id = MenuConstant.ROOT_MENU_ID

    return [rootMenu]
  }

  public static getCatalogMenuTreeList = async (projectId: string, refresh: boolean=false) => {
    const menuList = MenuUtil.menuTreeMap.get(projectId)
    if (!refresh && menuList && Array.isArray(menuList) && menuList.length > 0) {
      return menuList
    }

    const res = await getMenuTree(projectId)
    MenuUtil.menuTreeMap.set(projectId, res.data)
    return res.data
  }


}