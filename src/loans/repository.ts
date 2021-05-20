import database from '../utils/database';

import type { TBaseLoan, TReturnLoanBody } from './types';

const lendLoan = async ({ memberId, copyId }: TBaseLoan) => {
  await database.raw(
    'exec dbo.insertLoan @memberId = :memberId, @copyId = :copyId, @borrowDate = :borrowDate, @returnDate = :returnDate, @dueDate = :dueDate, @graceDate = :graceDate',
    {
      borrowDate: null,
      copyId,
      dueDate: null,
      graceDate: null,
      memberId,
      returnDate: null,
    },
  );
};

const returnLoan = async ({
  memberId,
  copyId,
  borrowDate,
  condition,
}: TReturnLoanBody) => {
  await database.raw(
    'exec dbo.returnLoan @borrowDate = :borrowDate, @memberId = :memberId, @copyId = :copyId, @condition = :condition',
    { borrowDate, condition, copyId, memberId },
  );
};

export { lendLoan, returnLoan };
