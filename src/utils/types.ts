import type { Request } from 'express';
import type { ParamsDictionary, Query } from 'express-serve-static-core';

import type { TStaffPersonWithoutPasswordHash } from '../staff/types';

type TRequest<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Query,
  Locals extends Record<string, unknown> = Record<string, unknown>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
  user: TStaffPersonWithoutPasswordHash;
};

export type { TRequest };
