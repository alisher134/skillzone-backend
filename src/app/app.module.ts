import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configValidate } from '@configs/config.validation';

import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';

import { AppConfigService } from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate: configValidate,
    }),
    PrismaModule,
    UserModule,
  ],
  providers: [AppConfigService],
})
export class AppModule {}
