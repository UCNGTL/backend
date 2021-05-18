import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

import { ensureAuth, ensureRole } from '../auth/middlewares';
import { createResponsePayload } from '../utils';

import {
  getMembers,
  getMember,
  insertMember,
  getTopFiftyPeople,
} from './repository';
import type { IMember } from './types';

const router = Router();

router.get(
  '/people/top-50-people',
  ensureAuth,
  ensureRole('references librarian'),
  async (request: Request, response: Response) => {
    const data = await getTopFiftyPeople();
    response.json(createResponsePayload({ payload: data }));
  },
);

router.get(
  '/people/members',
  ensureAuth,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { page = '1', limit = '20' } = request.query;
      let data;

      if (typeof page === 'string' && typeof limit === 'string') {
        const parsedPage = Number.parseInt(page, 10);
        let parsedLimit = Number.parseInt(limit, 10);
        parsedLimit = parsedLimit > 100 ? 100 : parsedLimit;
        data = await getMembers(parsedPage, parsedLimit);
      }
      response.json(createResponsePayload({ payload: data }));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/people/members/:ssn',
  ensureAuth,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { ssn } = request.params;
      const data = await getMember(ssn);
      response.json(createResponsePayload({ payload: data }));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/people/members',
  ensureAuth,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {
        address1,
        address2,
        address3,
        campus,
        city,
        fname,
        isProfessor,
        lname,
        phoneNumber,
        ssn,
        zipCode,
      } = request.body;

      const member: IMember = {
        address1,
        address2,
        address3,
        campus,
        city,
        fname,
        isProfessor: isProfessor === 'true',
        lname,
        phoneNumber,
        ssn,
        zipCode,
      };

      await insertMember(member);

      response.send(createResponsePayload({ payload: member }));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
