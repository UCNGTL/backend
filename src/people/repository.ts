import database from '../utils/database';

import type { IPerson, IMember } from './types';

const getTopFiftyPeople = async () => {
  return await database<IPerson>('dbo.people').limit(50).select('*');
};

const getMembers = async (page: number, pageSize: number) => {
  return database.raw<IMember>(
    `exec dbo.getMembers @page = ${page}, @pageSize = ${pageSize}`,
  );
};

const getMember = async (ssn: string) => {
  return database.raw<IMember>(`exec dbo.getMember @ssn = ${ssn}`);
};

const insertMember = async (member: IMember) => {
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
  } = member;

  return database.raw<IMember>(
    `exec dbo.insertLibraryMember @ssn = '${ssn}', @fname = '${fname}', @lname = '${lname}', @campus = '${campus}', @isProfessor = ${isProfessor}, @address1 = '${address1}', @address2 = '${address2}', @address3 = '${address3}', @city = '${city}', @zipCode = '${zipCode}', @phoneNumber = '${phoneNumber}'`,
  );
};

export { getTopFiftyPeople, getMembers, getMember, insertMember };
