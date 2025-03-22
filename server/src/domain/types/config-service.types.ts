import type applicationConfig from '../../../config'

export interface IDotEnv {
  config(): void
}

export type AppConfig = typeof applicationConfig
