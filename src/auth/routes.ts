import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import createError from 'http-errors';

import { createResponsePayload } from '../utils';
import * as redis from '../utils/redis';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './repository';
import type { LoginBody } from './types';

const router = Router();

router.post(
  '/auth/login',
  async (
    request: Request<{}, {}, LoginBody>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { password, ssn } = request.body;

      // @TODO: Implement propert password checking
      if (ssn !== 'AAAOCUR1' || password !== 'AdrienBorer') {
        next(createError(401, 'Incorrect password.', { expose: true }));
        return;
      }

      const accessToken = await generateAccessToken(ssn);
      const refreshToken = await generateRefreshToken(ssn);
      await redis.set(refreshToken, ssn);
      response.send(
        createResponsePayload({ payload: { accessToken, refreshToken } }),
      );
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/auth/token',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { refreshToken } = request.body;

      let ssn;
      try {
        const payload = await verifyRefreshToken(refreshToken);
        ssn = payload.ssn;
      } catch {
        next(createError(401, 'Provided token is invalid.', { expose: true }));
      }

      const associatedSsn = await redis.get(refreshToken);
      if (ssn !== associatedSsn) {
        next(
          createError(
            401,
            'Refresh token is either expired, invalid or does not match with the user.',
            { expose: true },
          ),
        );
      }

      const accessToken = await generateAccessToken(ssn);
      response.send(createResponsePayload({ payload: { accessToken } }));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
