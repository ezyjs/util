import { FileUtil } from './FileUtil'
import { ErrorUtil } from './ErrorUtil'
import { ConstantValue } from './constant'

import yaml from 'js-yaml'

import type { Config } from './interface'

export class ConfigUtil {
  private static instance: ConfigUtil
  private config: Config = {}

  private constructor() { }

  public static getInstance(): ConfigUtil {
    if (!ConfigUtil.instance) {
      ConfigUtil.instance = new ConfigUtil()
    }
    return ConfigUtil.instance
  }

  /**
   * 설정 파일을 로드합니다.
   * @param filePath 설정 파일 경로
   */
  public async loadConfig(filePath: string): Promise<void> {
    try {
      const fileContent = await FileUtil.read(filePath, { encoding: ConstantValue.ENCODING_TYPE.UTF_8 })
      const fileExtension = FileUtil.getFileExtension(filePath).toLowerCase()

      switch (fileExtension) {
        case ConstantValue.FILE_EXTENSION.JSON: {
          this.config = JSON.parse(fileContent)
          break
        }
        case ConstantValue.FILE_EXTENSION.YAML:
        case ConstantValue.FILE_EXTENSION.YML: {
          this.config = yaml.load(fileContent) as Config
          break
        }
        default: {
          throw ErrorUtil.createError('UNSUPPORTED', 'Unsupported file format. Use .json, .yaml, or .yml')
        }
      }

    } catch (error) {
      throw ErrorUtil.NotFoundError(`Error loading config file: ${error}`)
    }
  }

  /**
   * 환경 변수를 설정에 추가합니다.
   * @param prefix 환경 변수 접두사 (선택적)
   */
  public loadEnv(prefix: string = ''): void {
    Object.keys(process.env).forEach(key => {
      if (key.startsWith(prefix)) {
        this.set(key.slice(prefix.length), process.env[key])
      }
    })
  }

  /**
   * 설정 값을 가져옵니다.
   * @param key 설정 키
   * @param defaultValue 기본값 (선택적)
   */
  public get<T>(key: string, defaultValue?: T): T {
    const value = this.getNestedValue(this.config, key)
    return (value !== undefined ? value : defaultValue) as T
  }

  /**
   * 설정 값을 설정합니다.
   * @param key 설정 키
   * @param value 설정 값
   */
  public set(key: string, value: any): void {
    this.setNestedValue(this.config, key, value)
  }

  /**
   * 현재 설정을 파일로 저장합니다.
   * @param filePath 저장할 파일 경로
   */
  public saveConfig(filePath: string): void {
    try {
      const fileExtension = FileUtil.getFileExtension(filePath).toLowerCase()
      let configString: string

      switch (fileExtension) {
        case ConstantValue.FILE_EXTENSION.JSON: {
          configString = JSON.stringify(this.config, null, 2)
          break
        }

        case ConstantValue.FILE_EXTENSION.YAML:
        case ConstantValue.FILE_EXTENSION.YML: {
          configString = yaml.dump(this.config)
          break
        }

        default: {
          break
        }
      }

      if (fileExtension === '.json') {
        configString = JSON.stringify(this.config, null, 2)
      } else if (fileExtension === '.yaml' || fileExtension === '.yml') {
      } else {
        throw new Error('Unsupported file format. Use .json, .yaml, or .yml')
      }

      FileUtil.write(filePath, configString!, 'utf8')
    } catch (error) {
      console.error(`Error saving config file: ${error}`)
    }
  }
  private getNestedValue(obj: Config, key: string): any {
    return key.split('.').reduce((prev: any, curr: string) => prev && prev[curr], obj)
  }

  private setNestedValue(obj: Config, key: string, value: any): void {
    const keys = key.split('.');
    const lastKey = keys.pop()
    const lastObj = keys.reduce((prev, curr) => {
      if (!prev[curr]) prev[curr] = {}
      return prev[curr] as Config
    }, obj)
    if (lastKey) lastObj[lastKey] = value
  }
}