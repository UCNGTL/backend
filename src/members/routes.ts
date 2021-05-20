import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

import { ensureAuth, ensureRole } from '../auth/middlewares';
import { createResponsePayload } from '../utils';
import { ROLES } from '../utils/rolesHierarchy';

import { getMembers, getMember, insertMember } from './repository';
import type { TMember, TGetMembersRequest } from './types';

const router = Router();

router.get(
  '/members',
  ensureAuth,
  ensureRole(ROLES.referenceLibrarian),
  async (
    request: TGetMembersRequest,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { page } = request.query;
      const { data, pagination } = await getMembers({ page });
      response.json(createResponsePayload({ payload: { data, pagination } }));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/members/:ssn',
  ensureAuth,
  ensureRole(ROLES.referenceLibrarian),
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
  '/members',
  ensureAuth,
  ensureRole(ROLES.referenceLibrarian),
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

      const member: TMember = {
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
