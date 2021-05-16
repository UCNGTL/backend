import { Router } from 'express';
import type { Request, Response } from 'express';

import { ensureAuth } from '../auth/middlewares';
import { createResponsePayload } from '../utils';

import { getTopFiftyPeople } from './repository';

const router = Router();

router.get(
  '/people/top-50-people',
  ensureAuth,
  async (request: Request, response: Response) => {
    const data = await getTopFiftyPeople();
    response.json(createResponsePayload({ payload: data }));
  },
);

export default router;
