import { Router } from 'express';
import type { Request, Response } from 'express';

import { ensureAuth } from '../auth/middlewares';
import { createResponsePayload } from '../utils';

import { getBooksWithFilterValues } from './repository';
import type { IFilter } from './types';

const router = Router();

router.get(
  '/books',
  ensureAuth,
  async (request: Request, response: Response) => {
    const {
      language,
      subject,
      edition,
      lname,
      bindingType,
      pageNumber,
    } = request.query as IFilter;
    const data = await getBooksWithFilterValues({
      bindingType,
      edition,
      language,
      lname,
      pageNumber,
      subject,
    });
    response.json(createResponsePayload({ payload: data }));
  },
);

export default router;
