import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import type { Request, Response } from 'express';

import { UserRepository } from '../user/user.repository';

import { AuthCookieService } from './auth-cookie.service';
import type { IAuthResponse, IJwtPayload, ITokens, IUserMap } from './auth.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private TOKEN_EXPIRATION_DATE = {
    accessToken: '15m',
    refreshToken: '7d',
  };

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly authCookieService: AuthCookieService,
  ) {}

  async register(res: Response, dto: RegisterDto): Promise<IAuthResponse> {
    const existsUser = await this.userRepository.findOneByEmail(dto.email);
    if (existsUser) throw new BadRequestException('User with this email is already in use!');

    const user = await this.userRepository.create({
      email: dto.email,
      username: dto.username,
      password: await hash(dto.password),
    });

    return await this.generateAuthResponse(res, user);
  }

  async login(res: Response, dto: LoginDto): Promise<IAuthResponse> {
    const user = await this.validateUser(dto);

    return await this.generateAuthResponse(res, user);
  }

  async refresh(res: Response, req: Request) {
    const refreshToken = req.cookies[this.authCookieService.REFRESH_TOKEN_NAME];
    if (!refreshToken) throw new UnauthorizedException('refreshToken not be provided');

    const payload: IJwtPayload = await this.jwtService.verifyAsync(refreshToken);
    if (!payload) throw new UnauthorizedException('refreshToken invalid');

    const user = await this.userRepository.findOneById(payload.id);

    return await this.generateAuthResponse(res, user);
  }

  logout(res: Response): boolean {
    this.authCookieService.removeRefreshCookieToResponse(res);

    return true;
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userRepository.findOneByEmail(dto.email);
    if (!user) throw new BadRequestException('User email or password invalid!');

    const passwordMatches = await verify(user.password, dto.password);
    if (!passwordMatches) throw new BadRequestException('User email or password invalid!');

    return user;
  }

  private async generateAuthResponse(res: Response, user: Partial<User>): Promise<IAuthResponse> {
    const { refreshToken, ...tokens } = await this.issueTokens({ id: user.id });

    this.authCookieService.sendRefreshCookieToResponse(res, refreshToken);

    return {
      user: this.mapUser(user),
      ...tokens,
    };
  }

  private async issueTokens(payload: IJwtPayload): Promise<ITokens> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.TOKEN_EXPIRATION_DATE.accessToken,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.TOKEN_EXPIRATION_DATE.refreshToken,
    });

    return { accessToken, refreshToken };
  }

  private mapUser(user: Partial<User>): IUserMap {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
