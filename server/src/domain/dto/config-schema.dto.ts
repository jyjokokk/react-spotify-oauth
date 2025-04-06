import { Transform } from 'class-transformer'
import { IsBoolean, IsInt, IsObject, IsString } from 'class-validator'

interface EnvValue {
  value: string
}

class DatabaseConfig {
  @IsString({ each: true })
  collections: string[]
}

export class ConfigSchema {
  @Transform(({ value }: EnvValue) => parseInt(value, 10))
  @IsInt()
  PORT: number

  @Transform(({ value }: EnvValue) => value === 'true')
  @IsBoolean()
  ENCRYPT_DATABASE: boolean

  @IsString()
  ENCRYPTION_KEY: string

  @IsString()
  DB_FILE_DIR: string

  @IsObject()
  database: DatabaseConfig
}
