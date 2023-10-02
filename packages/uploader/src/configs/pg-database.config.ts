import { env } from './env';
import { databaseConfig } from './types';

export type postgresConfig = databaseConfig & {
  type: 'postgres';
};

export const pgDatabaseConfig: postgresConfig = {
  type: 'postgres',
  host: env.PG_HOST,
  port: Number(env.PG_PORT),
  username: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
};
