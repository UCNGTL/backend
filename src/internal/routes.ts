import type { Request, Response } from 'express';
import { Router } from 'express';

import { createResponsePayload } from '../utils';

const router = Router();

router.post(
  '/internal/sync-employees',
  async (request: Request, response: Response) => {
    response.json(createResponsePayload());
  },
);

export default router;
