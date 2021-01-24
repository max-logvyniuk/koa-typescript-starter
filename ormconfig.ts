require('dotenv').config();
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

import { config as configJson, IConfigProps } from './app/config';

const environment = process.env.NODE_ENV || 'development';
console.info('env', environment);
let config: IConfigProps;
if (environment === 'production') {
  config = configJson.development;
} else {
  config = configJson.production;
}

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.username,
  password: config.password,
  database: config.database,
  // database: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/db_koa_ts',
  synchronize: true,
  migrations: ['app/db/migrations/**/*{.ts,.js}'],
  entities: [
    `${__dirname}/app/db/models/**/*{.ts,.js}`,
  ],
  cli: {
    entitiesDir: 'app/db/models',
    migrationsDir: 'app/db/migrations',
  },
};

export = dbConfig;
