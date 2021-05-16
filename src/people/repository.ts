import database from '../utils/database';

import type { IPerson, IMember } from './types';

const getTopFiftyPeople = async () => {
  return await database<IPerson>('dbo.people').limit(50).select('*');
};

const getMembers = async (page: number, pageSize: number) => {
  return database.raw<IMember>(
    `exec getMembers @page = ${page}, @pageSize = ${pageSize}`,
  );
};

const getMember = async (ssn: string) => {
  return database.raw<IMember>(`exec getMember @ssn = ${ssn}`);
};

export { getTopFiftyPeople, getMembers, getMember };
