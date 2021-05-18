import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

import { ensureAuth } from '../auth/middlewares';
import { createResponsePayload } from '../utils';

import { lend, returnLoan } from './repository';

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

router.patch(
  '/loans/return',
  //   ensureAuth,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { memberId, copyId, condition, borrowDate } = request.body;

      const data = await returnLoan(memberId, copyId, borrowDate, condition);
      response.json(createResponsePayload({ payload: data }));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
