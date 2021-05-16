import util from 'util';

import redis from 'redis';

import config from './config';

const connection = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
});

const get = util.promisify(connection.get).bind(connection);
const set = util.promisify(connection.set).bind(connection);

export { get, set };
