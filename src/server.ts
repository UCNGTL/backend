import http from 'http';

import app from './app';
import config from './utils/config';

const port = config.port;
const server = http.createServer(app);

server.listen(port);
