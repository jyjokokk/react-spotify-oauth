/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as dotenv from 'dotenv'
import applicationConfig from '../../config'
import type { IDotEnv, AppConfig } from '../domain/types/config-service.types'
import { ConfigSchema } from '../domain/interfaces/config-schema.dto'
import { validateObject } from '../utils/validateObject';

export class ConfigService {
  private static instance: ConfigService
  private readonly config: ConfigSchema

  /**
   * @param dotenv This is passed as a parameter to allow for dependency injection
   * @param appConfig Object defined in the application config.ts file
   */
  private constructor(
    private readonly dotenv: IDotEnv,
    private readonly appConfig: AppConfig
  ) {
    this.dotenv.config()
    const plainConfig = {
      ...process.env,
      ...this.appConfig
    }
    const configClass = validateObject(plainConfig, ConfigSchema)
    this.config = configClass
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService(dotenv, applicationConfig)
    }
    return ConfigService.instance
  }

  public get(key: keyof typeof this.config): unknown {
    return this.config[key]
  }

  public getConfig() {
    return this.config
  }
}

export const configService = ConfigService.getInstance()
export const Config = configService.getConfig()
