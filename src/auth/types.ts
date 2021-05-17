import type { Request } from 'express';

import type { TStaffPerson } from '../staff/types';

type TLoginRequest = Request<
  {},
  {},
  {
    ssn: string;
    password: string;
  }
>;

type TRefreshTokenRequest = Exclude<TStaffPerson, 'passwordHash'> &
  Request<
    {},
    {},
    {
      refreshToken: string;
    }
  >;

export { TLoginRequest, TRefreshTokenRequest };
