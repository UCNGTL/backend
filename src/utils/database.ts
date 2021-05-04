import sql from 'mssql';

import config from './config';

export default new sql.ConnectionPool({
  database: config.database.name,
  password: config.database.password,
  server: config.database.server,
  user: config.database.user,
});
