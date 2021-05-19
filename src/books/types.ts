import type { Request } from 'express';
import type { IBasePagination } from 'knex-paginate';

type TGetBooksRequest = Request<
  {},
  {},
  {},
  TGetBooksFilter & TGetBooksPagination
>;

type TGetBooksResponsePayload = {
  data: TBookWithAuthorsAndSubjects[];
  pagination: IBasePagination;
};

type TBook = {
  isbn: string;
  title: string;
  description: string;
  edition: string;
  language: string;
  bindingType: string;
  itemId: number;
  author: string;
  subject: string;
};

type TBooksNormalized = {
  [isbn: string]: TBookWithAuthorsAndSubjects;
};

type TBookWithAuthorsAndSubjects = Omit<TBook, 'author' | 'subject'> & {
  authors: string[];
  subjects: string[];
};

type TGetBooksFilter = {
  language?: string;
  subject?: string;
  edition?: string;
  lname?: string;
  bindingType?: string;
};

type TGetBooksPagination = {
  page?: string;
};

export type {
  TBook,
  TBooksNormalized,
  TBookWithAuthorsAndSubjects,
  TGetBooksFilter,
  TGetBooksPagination,
  TGetBooksRequest,
  TGetBooksResponsePayload,
};
