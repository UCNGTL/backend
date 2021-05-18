import type { TRequest } from '../utils/types';

type TLoginRequest = TRequest<
  {},
  {},
  {
    ssn: string;
    password: string;
  }
>;

type TRefreshTokenRequest = TRequest<
  {},
  {},
  {
    refreshToken: string;
  }
>;

export { TLoginRequest, TRefreshTokenRequest };
