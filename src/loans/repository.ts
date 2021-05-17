import database from '../utils/database';

const lend = async (
  memberId: string,
  copyId: number,
  borrowDate: Date = null,
  returnDate: Date = null,
  dueDate: Date = null,
  graceDate: Date = null,
) => {
  return database.raw(
    'exec dbo.insertLoan @memberId = :memberId, @copyId = :copyId, @borrowDate = :borrowDate, @returnDate = :returnDate, @dueDate = :dueDate, @graceDate = :graceDate',
    {
      borrowDate,
      copyId,
      dueDate,
      graceDate,
      memberId,
      returnDate,
    },
  );
};

const returnLoan = async (
  memberId: string,
  copyId: number,
  borrowDate: Date,
  condition: string,
) => {
  return database.raw(
    'exec dbo.returnLoan @borrowDate = :borrowDate, @memberId = :memberId, @copyId = :copyId, @condition = :condition',
    { borrowDate, condition, copyId, memberId },
  );
};

export { lend, returnLoan };
