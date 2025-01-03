import { AppConfigService } from '@app/app-config.service';

export const isProduction = (appConfig: AppConfigService): boolean =>
  appConfig.nodeEnv === 'production';
