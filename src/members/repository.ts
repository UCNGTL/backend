import database from '../utils/database';

import type { IPerson, IMember } from './types';

const getTopFiftyPeople = async () => {
  return await database<IPerson>('dbo.people').limit(50).select('*');
};

const getMembers = async (page: number, pageSize: number) => {
  const queryResult = await database('dbo.members')
    .select('*')
    .as('m')
    .leftJoin('personAddresses', 'books.isbn', 'bookAuthors.bookIsbn')
    .leftJoin('people', 'books.isbn', 'bookSubjects.bookIsbn')
    .modify(function (queryBuilder) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && key !== 'pageNumber') {
          let localKey = key;
          if (key === 'subject') {
            localKey = 'name';
          }
          void queryBuilder.where(localKey, 'like', `%${value}%`);
        }
      }
    })
    .orderBy('isbn', 'asc')
    .paginate<TBook[]>({
      currentPage: Number.parseInt(pagination.pageNumber, 10) || 1,
      perPage: 50,
    });
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
