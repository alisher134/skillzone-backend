import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { isProduction } from '@common/utils/production.utils';
import { swaggerSetup } from '@common/utils/swagger.utils';

import { AppConfigService } from './app/app-config.service';
import { AppModule } from './app/app.module';
import { getCorsConfig } from './configs/cors.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  app.setGlobalPrefix('v1/api');

  app.use(cookieParser());
  app.enableCors(getCorsConfig(appConfig));

  if (!isProduction(appConfig)) {
    swaggerSetup(app, appConfig);
  }

  const port = appConfig.port;
  await app.listen(port);
}
bootstrap();
