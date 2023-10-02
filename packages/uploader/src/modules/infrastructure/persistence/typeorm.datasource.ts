import { pgDatabaseConfig } from 'src/configs/pg-database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const datasourceOptions: DataSourceOptions = {
  type: pgDatabaseConfig.type,
  port: pgDatabaseConfig.port,
  database: pgDatabaseConfig.database,
  username: pgDatabaseConfig.username,
  password: pgDatabaseConfig.password,
  host: pgDatabaseConfig.host,
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/**/migrations/*.js'],
};

export default new DataSource(datasourceOptions);
