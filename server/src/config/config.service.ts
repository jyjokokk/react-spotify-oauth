import * as dotenv from 'dotenv'
import applicationConfig from '../../config'

type IDotEnv = typeof dotenv
type AppConfig = typeof applicationConfig

export class ConfigService {
  private static instance: ConfigService
  private readonly config: Record<string, any>
  
  private constructor(
    private readonly dotenv: IDotEnv,
    private readonly appConfig: AppConfig
  ) { 
    this.config = dotenv.config()
  }  
 
  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService(dotenv, applicationConfig)
    }
    return ConfigService.instance
  }
  
  public get(key: string): any {
    return this.config[key]
  }
  
  public getConfig() {
    return this.config
  }   
}

export const configService = ConfigService.getInstance()
export const Config = configService.getConfig()

