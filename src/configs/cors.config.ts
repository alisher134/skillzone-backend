import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppConfigService } from 'src/app/app-config.service';

export const getCorsConfig = (appConfig: AppConfigService): CorsOptions => ({
  origin: appConfig.allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  exposedHeaders: ['set-cookie'],
});
