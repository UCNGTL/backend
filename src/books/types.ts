type IBook = {
  isbn: string;
  title: string;
  description: string;
  edition: string;
  language: string;
  bindingType: string;
  itemId: number;
};

type IAuthor = {
  author: string;
};

type ISubject = {
  subject: string;
};

type IBookWithAuthorsSubjects = IAuthor & IBook & ISubject;

type IFilter = {
  language?: string;
  subject?: string;
  edition?: string;
  lname?: string;
  bindingType?: string;
  pageNumber?: number;
};

export type { IBook, IFilter, IBookWithAuthorsSubjects };
