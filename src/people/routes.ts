import { Router } from 'express';

import { ensureAuth } from '../auth/middlewares';
import { createResponsePayload } from '../utils';

import { getMembers, getMember, getTopFiftyPeople } from './repository';

import type { Request, Response } from 'express';

const router = Router();

router.get(
  '/people/top-50-people',
  ensureAuth,
  async (request: Request, response: Response) => {
    const data = await getTopFiftyPeople();
    response.json(createResponsePayload({ payload: data }));
  },
);

router.get(
  '/people/members',
  ensureAuth,
  async (request: Request, response: Response) => {
    const { page = '1', limit = '20' } = request.query;
    let data;

    if (typeof page === 'string' && typeof limit === 'string') {
      const parsedPage = Number.parseInt(page, 10);
      let parsedLimit = Number.parseInt(limit, 10);
      parsedLimit = parsedLimit > 100 ? 100 : parsedLimit;
      data = await getMembers(parsedPage, parsedLimit);
    }
    response.json(createResponsePayload({ payload: data }));
  },
);

router.get(
  '/people/members/:ssn',
  ensureAuth,
  async (request: Request, response: Response) => {
    const { ssn } = request.params;
    const data = await getMember(ssn);
    response.json(createResponsePayload({ payload: data }));
  },
);

export default router;
