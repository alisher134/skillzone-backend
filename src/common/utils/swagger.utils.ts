import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigService } from '@app/app-config.service';

export function swaggerSetup(app: INestApplication, appConfig: AppConfigService): void {
  const config = new DocumentBuilder()
    .setTitle(`${appConfig.appName} API`)
    .setDescription(`The ${appConfig.appName} API description`)
    .addBearerAuth()
    .build();

  SwaggerModule.setup(appConfig.swaggerPrefix, app, SwaggerModule.createDocument(app, config));
}
