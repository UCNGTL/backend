import bodyParser from 'body-parser';
import compression from 'compression';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import type { HttpError } from 'http-errors';
import createError from 'http-errors';

import { ensureAuth } from './auth/middlewares';
import { generateAccessToken } from './auth/repository';
import type { LoginBody } from './auth/types';
import { getTopFiftyPeople } from './people/repository';
import { createResponsePayload, handleError } from './utils';
import config from './utils/config';

const app = express();

app.set('port', config.port);

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/login',
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
      response.send(createResponsePayload({ payload: { accessToken } }));
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  '/top-50-people',
  ensureAuth,
  async (request: Request, response: Response) => {
    const data = await getTopFiftyPeople();
    response.json(createResponsePayload({ payload: data }));
  },
);

app.use(
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  (
    error: Error | HttpError,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    const json = handleError(error);
    response.status(json.status).json(json);
  },
);

export default app;
