import type { Request } from 'express';

type TLoginRequest = Request<
  {},
  {},
  {
    ssn: string;
    password: string;
  }
>;

type TRefreshTokenRequest = Request<
  {},
  {},
  {
    refreshToken: string;
  }
>;

export { TLoginRequest, TRefreshTokenRequest };
