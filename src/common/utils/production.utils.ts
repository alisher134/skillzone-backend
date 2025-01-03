import { AppConfigService } from '@app/app-config.service';

export function isProduction(appConfig: AppConfigService): boolean {
  return appConfig.nodeEnv === 'production';
}
