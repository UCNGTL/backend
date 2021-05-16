import rc from 'rc';

type DatabaseConfig = {
  name: string;
  password: string;
  server: string;
  user: string;
};

type RedisConfig = {
  host: string;
  password: string | null;
  port: number;
  user: string | null;
};

type SecurityConfig = {
  accessTokenPrivateKeyFilename: string;
  accessTokenPublicKeyFilename: string;
  refreshTokenPrivateKeyFilename: string;
  refreshTokenPublicKeyFilename: string;
};

type Config = {
  database: DatabaseConfig;
  isDevelopmentEnvironment: boolean;
  port: number;
  redis: RedisConfig;
  security: SecurityConfig;
};

export default rc('config') as Config;
