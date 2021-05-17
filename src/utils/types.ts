import type { Request } from 'express';

import type { TStaffPersonWithoutPasswordHash } from '../staff/types';

type TRequest = Request & {
  user: TStaffPersonWithoutPasswordHash;
};

export type { TRequest };
