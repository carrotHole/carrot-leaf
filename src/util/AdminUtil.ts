export default class AdminUtil{
  public static isAdmin(username:string){
   return ['superman','carrot'].includes(username)
  }

  public static isSuperAdmin(username:string){
    return ['superman'].includes(username)
  }

}