import database from '../utils/database';

import type { IPerson } from './types';

const getTopFiftyPeople = async () => {
  const pool = await database.connect();
  const data = await pool.query<IPerson>('select top 50 * from dbo.people;');

  return data.recordset;
};

export { getTopFiftyPeople };
