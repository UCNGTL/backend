import { TStaffPersonWithoutPasswordHash } from './staff/types';

declare global {
  namespace Express {
    interface Request {
      user: TStaffPersonWithoutPasswordHash
    }
  }
}
