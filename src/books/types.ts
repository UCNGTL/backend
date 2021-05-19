import type { Request } from 'express';

type TGetBooksRequest = Request<
  {},
  {},
  {},
  TGetBooksFilter & TGetBooksPagination
>;

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
  pageNumber?: string;
};

export type {
  TBook,
  TBooksNormalized,
  TBookWithAuthorsAndSubjects,
  TGetBooksFilter,
  TGetBooksPagination,
  TGetBooksRequest,
};
