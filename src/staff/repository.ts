import createError from 'http-errors';

import database from '../utils/database';

import type { TStaff } from './types';

const getStaffPersonBySsn = async (
  ssn: string,
  throwIfNotFound = true,
): Promise<TStaff> => {
  const result = await database('dbo.staff')
    .select('*')
    .where({
      personSsn: ssn,
    })
    .first();
  if (!result && throwIfNotFound) {
    throw createError(404, `Staff person with ssn "${ssn}" does not exist.`, {
      expose: true,
    });
  }
  return result;
};

export { getStaffPersonBySsn };
