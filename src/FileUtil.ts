import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
import path, { extname } from 'path'

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
   * getFileExtension
   * @param fileName 
   * @desc 
   */
  static getFileExtension(fileName: string): string {
    return path.extname(fileName)
  }

  /**
   * read
   * @desc
   */
  static read(filePath: string): Promise<Buffer>
  static read(filePath: string, options: { encoding: BufferEncoding }): Promise<string>
  static read(filePath: string, options?: { encoding?: BufferEncoding }): Promise<Buffer | string> {
    return new Promise((resolve, reject) => {
      const existFlag = existsSync(filePath)

      if (!existFlag) {
        reject('Path that does not exist.')
      }

      let fileData: string | Buffer = readFileSync(filePath)

      if (options?.encoding) {
        fileData = fileData.toString(options.encoding)
      }

      resolve(fileData)
    })
  }

  /**
   * write
   * @desc
   */
  static async write(filePath: string, fileName: string, content: string | Buffer): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ext = extname(fileName)

      if (ext !== '') {
        reject('The file extension does not exist.')
      }

      if (existsSync(path.join(filePath, fileName))) {
        reject('The file already exists in that path.')
      }

      writeFileSync(path.join(filePath, fileName), content)
      resolve(true)
    })
  }

  /**
   * createDirectory
   * @desc
   */
  static async createDirectory(targetPath: string, options: { recursive?: boolean }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (existsSync(targetPath)) {
        reject('The directory already exists in that path.')
      }

      const path = mkdirSync(targetPath, { recursive: options.recursive })
      if (path === '') {
        reject('directory create fail.')
      }

      resolve(true)
    })
  }

  /**
   * deleteDirectory
   * @desc
   */
  static async deleteDirectory(targetPath: string, options?: { force?: boolean, recursive?: boolean }) {
    return new Promise((resolve, reject) => {
      if (!existsSync(targetPath)) {
        reject('The folder does not exist in that path.')
      }

      rmSync(targetPath, { force: options.force, recursive: options.recursive })

      resolve(true)
    })
  }
}
