import { Router } from 'express';

import { ensureAuth } from '../auth/middlewares';
import { createResponsePayload } from '../utils';

import { lend } from './repository';

import type { Request, Response, NextFunction } from 'express';

const router = Router();

router.post(
  '/loans',
  ensureAuth,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { memberId, copyId } = request.body;

      // can be extended to take dates as parameters
      const data = await lend(memberId, copyId);
      response.json(createResponsePayload({ payload: data }));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
