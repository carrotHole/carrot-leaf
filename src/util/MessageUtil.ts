import { ElMessage } from 'element-plus'

export default class MessageUtil {
  private static  msg = (msg: string, type: string) => {
    ElMessage({
      message: msg,
      type: type ? type : undefined
    })
  }

  public static success = (msg: string) => {
    MessageUtil.msg(msg, 'success')
  }
  public static  warning = (msg: string) => {
    MessageUtil.msg(msg, 'warning')
  }
  public static  info = (msg: string) => {
    MessageUtil.msg(msg, undefined)
  }
  public static  error = (msg: string) => {
    MessageUtil.msg(msg, 'error')
  }

}