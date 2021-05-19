import { TStaffPersonWithoutPasswordHash } from './staff/types';

declare global {
  namespace Express {
    interface Request {
      user: TStaffPersonWithoutPasswordHash
    }
  }
  namespace NodeJS {
    interface Global {
      ACCESS_TOKEN: string;
      REFRESH_TOKEN: string;
    }
  }
}
