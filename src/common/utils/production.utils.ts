import { ConfigService } from '@nestjs/config';

export const isProduction = (configService: ConfigService): boolean => {
  return configService.getOrThrow<string>('NODE_ENV') === 'production';
};
