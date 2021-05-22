import http from 'http';

import app from './app';
import config from './utils/config';

const server = http.createServer(app);

server.listen(process.env.PORT || config.port);
