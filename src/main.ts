import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { getCorsConfig } from './config/cors.config';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const cookieSecret = config.getOrThrow<string>('COOKIE_SECRET');
  app.use(cookieParser(cookieSecret));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix('v1/api');
  app.enableCors(getCorsConfig(config));

  const port = config.getOrThrow<number>('PORT');
  await app.listen(port);
}
bootstrap();
