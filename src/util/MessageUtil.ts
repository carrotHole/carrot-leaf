import { ElMessage } from 'element-plus'

export default class MessageUtil {
  private static msg = (msg: string, type: string) => {
    ElMessage({
      message: msg,
      type: type ? type : undefined
    })
  }

  public static success = (msg: string) => {
    MessageUtil.msg(msg, 'success')
  }
  public static warning = (msg: string) => {
    MessageUtil.msg(msg, 'warning')
  }
  public static info = (msg: string) => {
    MessageUtil.msg(msg, '')
  }
  public static error = (msg: string) => {
    MessageUtil.msg(msg, 'error')
  }


  public static confirm = async (msg: string, title='提示') => {
    let res = false
    await ElMessageBox.confirm(msg, title , {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      res = true
    }).catch(()=>{})
    return res
  }
}
