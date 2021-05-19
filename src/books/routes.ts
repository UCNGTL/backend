import { Router } from 'express';
import type { Response } from 'express';

import { ensureAuth } from '../auth/middlewares';
import { createResponsePayload } from '../utils';

import { getBooks } from './repository';
import type { TGetBooksRequest } from './types';

const router = Router();

router.get(
  '/books',
  // ensureAuth,
  async (request: TGetBooksRequest, response: Response) => {
    const { pageNumber, ...filters } = request.query;
    const data = await getBooks({ pageNumber }, filters);
    response.json(createResponsePayload({ payload: data }));
  },
);

export default router;
