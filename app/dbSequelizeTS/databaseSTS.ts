import { Sequelize } from 'sequelize-typescript';
import 'reflect-metadata';

import { config as configJson, IConfigProps } from '../config';
// import * as Models from './models';

const environment = process.env.NODE_ENV || 'development';
// console.info('env', environment);
let config: IConfigProps;
if (environment === 'production') {
  config = configJson.development;
} else {
  config = configJson.production;
}

const db =  new Sequelize({
  database: process.env.DB_NAME || 'typescript-koa',
  dialect: 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  storage: ':memory:',
  // models: Object.values(Models),
  models: [`${__dirname}/models`], // or [Player, Team],
});

// db.authenticate().then(() => {
//   console.info('Typescript-sequelize db connected!!');
// }).catch((error) => {
//   console.info('Typescript-sequelize db error: ', error);
// });

export default db;
