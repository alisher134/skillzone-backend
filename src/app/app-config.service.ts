import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv(): string {
    return this.configService.getOrThrow<string>('NODE_ENV');
  }

  get port(): number {
    return this.configService.getOrThrow<number>('APP_PORT');
  }

  get allowedOrigin(): string {
    return this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
  }

  get swaggerPrefix(): string {
    return this.configService.getOrThrow<string>('SWAGGER_PREFIX');
  }

  get appName(): string {
    return this.configService.getOrThrow<string>('APP_NAME');
  }
}
