
export default class BeanUtil {
  public static deepCopy = (src: any) => {
    return JSON.parse(JSON.stringify(src))
  }
}