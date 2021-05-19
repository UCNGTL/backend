import { Router } from 'express';
import type { Response } from 'express';

import { createResponsePayload } from '../utils';

import { getBooks } from './repository';
import type { TGetBooksRequest } from './types';

const router = Router();

router.get('/books', async (request: TGetBooksRequest, response: Response) => {
  const { pageNumber, ...filters } = request.query;
  const { data, pagination } = await getBooks({ pageNumber }, filters);
  response.json(createResponsePayload({ payload: { data, pagination } }));
});

export default router;
