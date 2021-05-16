import type { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { verifyAccessToken } from './repository';
import type { JWTPayload } from './types';

const ensureAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<JWTPayload> => {
  if (!request.headers.authorization) {
    next(
      createError(401, 'No authorization header present in request.', {
        expose: true,
      }),
    );
    return;
  }

  try {
    const [, accessToken] = request.headers.authorization.split(' ');
    await verifyAccessToken(accessToken);
    next();
  } catch {
    next(
      createError(401, 'Access token is invalid.', {
        expose: true,
      }),
    );
  }
};

export { ensureAuth };
