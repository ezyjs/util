import { randomUUID } from "crypto"

/**
 * RandomUtil
 * @desc Generates random value
 */
export class RandomUtil {
  constructor() { }

  /**
   * getUUID
   * @desc Generates a UUID-based random number, which is 32 characters by default.
   * @example
   * RandomUtil.getUUID() // d7a0247e303341cbb3641bfabdd4de50
   * RandomUtil.getUUID(16) // d7a0247e303341cb
   */
  static getUUID(digit: number = 32): string {
    let UUID = randomUUID().replace(/-/g, '')

    // *. more than 32 characters
    if (digit > 32) {
      while (UUID.length < digit) {
        UUID += randomUUID().replace(/-/g, '')
      }

      UUID = UUID.slice(0, digit)
    }
    // *. less than 32 characters
    else if (digit < 32) {
      UUID = UUID.slice(0, digit)
    }

    return UUID
  }
}
