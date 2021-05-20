import type { Request } from 'express';

type TBaseLoan = {
  memberId: string;
  copyId: number;
};

type TLoan = TBaseLoan & {
  borrowDate: Date;
  returnDate: Date;
  dueDate: Date;
  graceDate: Date;
};

type TReturnLoanBody = TBaseLoan & {
  borrowDate: TLoan['borrowDate'];
  condition: string;
};

type TPatchLoanRequest = Request<{}, {}, TReturnLoanBody>;

type TPostLoanRequest = Request<{}, {}, TBaseLoan>;

export type {
  TBaseLoan,
  TLoan,
  TPatchLoanRequest,
  TPostLoanRequest,
  TReturnLoanBody,
};
