import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppConfigService } from './app/app-config.service';
import { AppModule } from './app/app.module';
import { getCorsConfig } from './configs/cors.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  app.setGlobalPrefix('v1/api');

  app.use(cookieParser());
  app.enableCors(getCorsConfig(appConfig));

  const port = appConfig.port;
  await app.listen(port);
}
bootstrap();
