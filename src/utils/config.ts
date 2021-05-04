import rc from 'rc';

type DatabaseConfig = {
  name: string;
  password: string;
  server: string;
  user: string;
};

type SecurityConfig = {
  privateKeyFilename: string;
  publicKeyFilename: string;
};

type Config = {
  database: DatabaseConfig;
  isDevelopmentEnvironment: boolean;
  port: number;
  security: SecurityConfig;
};

export default rc('config') as Config;
