import { UserRole } from '@prisma/client';

export interface IUserMap {
  id: string;
  email: string;
  role: UserRole;
}

export interface IJwtPayload {
  id: string;
}

export interface IAuthResponse {
  user: IUserMap;
  accessToken: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
