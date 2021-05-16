import knex from 'knex';

import config from './config';

export default knex({
  client: 'mssql',
  connection: {
    database: config.database.name,
    host: config.database.server,
    password: config.database.password,
    user: config.database.user,
  },
});
