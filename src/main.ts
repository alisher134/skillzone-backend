import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { getCorsConfig } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const cookieSecret = config.getOrThrow<string>('COOKIE_SECRET');
  app.use(cookieParser(cookieSecret));

  app.setGlobalPrefix('v1/api');
  app.enableCors(getCorsConfig(config));

  const port = config.getOrThrow<number>('PORT');
  await app.listen(port);
}
bootstrap();
