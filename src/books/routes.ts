import { Router } from 'express';
import type { Response } from 'express';

import { createResponsePayload } from '../utils';

import { getBookAvailability, getBooks } from './repository';
import type {
  TGetBookAvailabilityRequest,
  TGetBookAvailabilityResponsePayload,
  TGetBooksRequest,
  TGetBooksResponsePayload,
} from './types';

const router = Router();

router.get('/books', async (request: TGetBooksRequest, response: Response) => {
  const { page, ...filters } = request.query;
  const { data, pagination } = await getBooks({ page }, filters);
  response.json(
    createResponsePayload<TGetBooksResponsePayload>({
      payload: { data, pagination },
    }),
  );
});

router.get(
  '/books/:isbn/availability',
  async (request: TGetBookAvailabilityRequest, response: Response) => {
    const { isbn } = request.params;
    const payload = await getBookAvailability(isbn);
    response.json(
      createResponsePayload<TGetBookAvailabilityResponsePayload>({ payload }),
    );
  },
);

export default router;
