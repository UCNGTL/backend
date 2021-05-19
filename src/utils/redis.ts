import util from 'util';

import redis from 'redis';

import config from './config';

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
});

const del = util.promisify(client.del).bind(client);
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);

export { client, del, get, set };
