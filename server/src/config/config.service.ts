/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as dotenv from 'dotenv'
import applicationConfig from '../../config'
import { JSONValue } from '../domain/types/json-object.type'

type IDotEnv = typeof dotenv
type AppConfig = typeof applicationConfig

export class ConfigService {
  private static instance: ConfigService
  private readonly config: Record<string, JSONValue>

  /**
   * @param dotenv This is passed as a parameter to allow for dependency injection
   * @param appConfig Object defined in the application config.ts file
   */
  private constructor(
    private readonly dotenv: IDotEnv,
    private readonly appConfig: AppConfig
  ) {
    this.dotenv.config()
    this.config = {
      ...process.env,
      ...this.appConfig
    }
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService(dotenv, applicationConfig)
    }
    return ConfigService.instance
  }

  public get(key: string): unknown {
    return this.config[key]
  }

  public getConfig() {
    return this.config
  }
}

export const configService = ConfigService.getInstance()
export const Config = configService.getConfig()
