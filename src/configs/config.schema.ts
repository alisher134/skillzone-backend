import { IsNumber, IsString } from 'class-validator';

export class ConfigSchema {
  @IsNumber()
  APP_PORT: number;

  @IsString()
  APP_NAME: string;

  @IsString()
  ALLOWED_ORIGIN: string;

  @IsString()
  SWAGGER_PREFIX: string;
}
