export default class AdminUtil{
  public static isAdmin(username:string){
   return ['superman','carrot'].includes(username)
  }
}