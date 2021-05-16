import database from '../utils/database';

import type { IPerson } from './types';

const getTopFiftyPeople = async () => {
  return await database<IPerson>('dbo.people').limit(50).select('*');
};

export { getTopFiftyPeople };
