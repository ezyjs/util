import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
import path from 'path'

/**
 * FileUtil
 * @desc File management
 */
export class FileUtil {
  constructor() { }

  /**
   * getLocalPath
   * @desc
   */
  static getLocalPath(): string {
    return process.cwd()
  }


  /**
   * getPath
   * @param paths 
   * @desc
   */
  static getPath(...paths: string[]): string {
    return path.join(this.getLocalPath(), ...paths)
  }

  /**
   * read
   * @desc
   */
  static read(path: string) {
    return new Promise((resolve, reject) => {
      const existFlag = existsSync(path)

      if (!existFlag) {
        reject('Path that does not exist.')
      }

      resolve(readFileSync(path))
    })
  }

  /**
   * write
   * @desc
   */
  static async write() { }

  /**
   * createDirectory
   * @desc
   */
  static async createDirectory() { }

  /**
   * deleteDirectory
   * @desc
   */
  static async deleteDirectory() { }
}