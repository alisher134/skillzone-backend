import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

import { isProduction } from '@/common/utils/production.utils';

@Injectable()
export class AuthCookieService {
  private readonly EXPIRATION_REFRESH_TOKEN = 7;
  readonly REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(private readonly configService: ConfigService) {}

  sendRefreshCookieToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRATION_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.getOrThrow<string>('DOMAIN'),
      expires: expiresIn,
      sameSite: isProduction(this.configService) ? 'strict' : 'lax',
      secure: isProduction(this.configService),
    });
  }

  removeRefreshCookieToResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.getOrThrow<string>('DOMAIN'),
      expires: new Date(0),
      sameSite: isProduction(this.configService) ? 'strict' : 'lax',
      secure: isProduction(this.configService),
    });
  }
}
