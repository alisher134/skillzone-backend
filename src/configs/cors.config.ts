import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppConfigService } from 'src/app/app-config.service';

export function getCorsConfig(appConfig: AppConfigService): CorsOptions {
  return {
    origin: appConfig.allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    exposedHeaders: ['set-cookie'],
  };
}
