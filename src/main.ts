import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './app/app-config.service';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

  app.setGlobalPrefix('v1/api');

  const port = config.port;
  await app.listen(port);
}
bootstrap();
