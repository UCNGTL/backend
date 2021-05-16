import database from '../utils/database';

import type { IFilter, IBookWithAuthorsSubjects } from './types';

const getBooksWithFilterValues = async (parameters: IFilter) => {
  const books = await database<IBookWithAuthorsSubjects>('dbo.books')
    .select(
      'isbn',
      'title',
      'description',
      'edition',
      'language',
      'bindingType',
      'itemId',
      'name as subject',
      database.raw('CONCAT(fname, \' \', lname) as "author"'),
    )
    .rightJoin('bookAuthors', 'books.isbn', 'bookAuthors.bookIsbn')
    .rightJoin('bookSubjects', 'books.isbn', 'bookSubjects.bookIsbn')
    .modify(function (queryBuilder) {
      for (const [key, value] of Object.entries(parameters)) {
        if (value !== undefined && key !== 'pageNumber') {
          void queryBuilder.where(`${key}`, 'like', `%${value}%`);
        }
      }
    })
    .orderBy('isbn', 'asc')
    .paginate({ currentPage: parameters.pageNumber || 1, perPage: 50 });

  const response = books.data.reduce((result, row) => {
    result[row.isbn] = result[row.isbn] || {
      ...row,
      authors: [],
      subjects: [],
    };

    result[row.isbn].subjects.push(row.subject);
    result[row.isbn].authors.push(row.author);
    result[row.isbn].subjects = Array.from(new Set(result[row.isbn].subjects));
    result[row.isbn].authors = Array.from(new Set(result[row.isbn].authors));

    return result;
  }, {});

  return { data: Object.values(response), pagination: books.pagination };
};

export { getBooksWithFilterValues };
