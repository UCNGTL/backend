import database from '../utils/database';

import type { TMember, TGetMembersPagination } from './types';

const getMembers = async (pagination: TGetMembersPagination) => {
  const queryResult = await database('members')
    .select(
      'members.id as memberId',
      'members.campus',
      'members.isProfessor',
      'personAddresses.address1',
      'personAddresses.address2',
      'personAddresses.address3',
      'personAddresses.city',
      'personAddresses.zipCode',
      'people.ssn',
      'people.fname',
      'people.lname',
      'personPhoneNumbers.phoneNumber',
    )
    .leftJoin(
      'personAddresses',
      'members.personSsn',
      'personAddresses.personSsn',
    )
    .leftJoin('people', 'people.ssn', 'members.personSsn')
    .leftJoin(
      'personPhoneNumbers',
      'personPhoneNumbers.personSsn',
      'members.personSsn',
    )
    .orderBy('people.ssn', 'asc')
    .paginate<TMember[]>({
      currentPage: Number.parseInt(pagination.page, 10) || 1,
      perPage: 50,
    });
  return queryResult;
};

const getMember = async (ssn: string) => {
  return database.raw<TMember>(`exec dbo.getMember @ssn = ${ssn}`);
};

const insertMember = async (member: TMember) => {
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

  await database.raw<TMember>(
    `exec dbo.insertLibraryMember @ssn = '${ssn}', @fname = '${fname}', @lname = '${lname}', @campus = '${campus}', @isProfessor = ${isProfessor}, @address1 = '${address1}', @address2 = '${address2}', @address3 = '${address3}', @city = '${city}', @zipCode = '${zipCode}', @phoneNumber = '${phoneNumber}'`,
  );
};

const deleteLibraryMember = async (ssn: TMember['ssn']) => {
  await database.raw(`exec dbo.deleteLibraryMember @ssn = '${ssn}'`);
};

export { getMembers, getMember, insertMember, deleteLibraryMember };
