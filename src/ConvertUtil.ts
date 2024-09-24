export class ConvertUtil {
  private static readonly POSITIVE_VALUES = ['y', 'yes', 'o', 'ok', 'on', 't', 'true', '1']

  constructor() { }

  /**
   * numToBool
   * @param originValue 0, 1, 2, 3, 4, 5 ...
   * @desc 
   * @example
   * ConvertUtil.numToBool(0) // false
   * ConvertUtil.numToBool(1) // true
   */
  public static numToBool(originValue: number): boolean {
    if (originValue === 0) {
      return false
    } else {
      return true
    }
  }

  /**
   * strToBool
   * @param originValue 
   * @desc
   * True: 'Y', 'Yes', 'True', 'T', 'Ok', 'O', '1'  
   * False: other
   * @example
   * ConvertUtil.strToBool('F') // false
   * ConvertUtil.strToBool('T') // true
   */
  public static strToBool(originValue: string): boolean {
    if (this.POSITIVE_VALUES.includes(originValue.toLocaleLowerCase())) {
      return true
    } else {
      return false
    }
  }

  /**
   * strToNum
   * @param value 
   * @desc
   * @example
   * ConvertUtil.strToNum() // 
   */
  public static strToNum(value: string, radix: number = 10): number {
    const result = parseInt(value, radix)
    if (isNaN(result)) {
      throw new Error(`Invalid integer string: ${value}`)
    }

    return result
  }

  /**
   * strToDate
   * @param value 
   * @desc
   * @example
   * ConvertUtil.strToDate() // 
   */
  public static strToDate(value: string): Date {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${value}`)
    }

    return date
  }

  /**
   * dateToStr
   * @param value 
   * @desc
   * @example
   * ConvertUtil.dateToStr() // 
   */
  public static dateToStr(value: Date, format: string = 'YYYY-MM-DD'): string {
    const year = value.getFullYear()
    const month = (value.getMonth() + 1).toString().padStart(2, '0')
    const day = value.getDate().toString().padStart(2, '0')
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
  }

  /**
   * base64Encode
   * @param value 
   * @desc
   * @example
   * ConvertUtil.base64Encode() // 
   */
  public static base64Encode(value: string): string {
    return Buffer.from(value).toString('base64')
  }

  /**
   * base64Decode
   * @param value 
   * @desc
   * @example
   * ConvertUtil.base64Decode() // 
   */
  public static base64Decode(value: string): string {
    return Buffer.from(value, 'base64').toString('utf-8')
  }
}