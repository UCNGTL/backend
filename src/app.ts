import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import createError from 'http-errors';

import authRoutes from './auth/routes';
import internalRoutes from './internal/routes';
import peopleRoutes from './people/routes';
import bookRoutes from './books/routes';
import { handleError } from './utils';
import config from './utils/config';

import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from 'http-errors';

const app = express();

app.set('port', config.port);

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(internalRoutes);
app.use(peopleRoutes);
app.use(bookRoutes)

app.use('*', (request: Request, response: Response, next: NextFunction) => {
  next(createError(404, 'Page does not exist.', { expose: true }));
});

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
