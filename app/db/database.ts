import fs from 'fs';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import startsWith from 'lodash/startsWith';
import path from 'path';
import { Sequelize } from 'sequelize';
import { config as configJson, IConfigProps } from '../config';
import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';

const parentDir = path.join(__dirname, '..');

const environment = process.env.NODE_ENV || 'development';
// console.info('env', environment);
let config: IConfigProps;
if (environment === 'production') {
  config = configJson.development;
} else {
  config = configJson.production;
}

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'typescript-koa',
  // entities: [
  //   `${parentDir}/**/*.entity.ts`,
  // ],
  synchronize: true,
  migrations: ['app/db/migrations/**/*{.ts,.js}'],
  entities: [
    `${__dirname}/models/**/*{.ts,.js}`,
  ],
  cli: {
    entitiesDir: 'app/db/models',
    migrationsDir: 'app/db/migrations',
  },
};

// console.info('connectionOpts!!!', connectionOpts);

const database: Promise<Connection> = createConnection(connectionOpts);

export default database;

// const basename = path.basename(__filename);
// const environment = process.env.NODE_ENV || 'development';
// console.info('env', environment);
// let config: IConfigProps;
// if (environment === 'production') {
//   config = configJson.development;
// } else {
//   config = configJson.production;
// }
//
// const database: any = {};
//
// let sequelize: any;
// if (config.environment === 'production') {
//   sequelize = new Sequelize(config.databaseUrl, {
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: true,
//         native: true,
//       }
//     }
//     // {
//     //   dialect: 'postgres',
//     //   protocol: 'postgres',
//     //   dialectOption: {
//     //     ssl: true,
//     //     native: true,
//     //   },
//     // }
// );
//
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     {
//       dialect: 'postgres',
//       protocol: 'postgres',
//       dialectOptions: {
//         // ssl: true,
//         native: true,
//       }
//     }
//     // config,
//   );
// }
//
// // console.info('sequelize!!!', sequelize);
//
// forEach(
//   filter(fs.readdirSync(`${__dirname}/models`), file => {
//     return (
//       !startsWith(file, '.entity.') && file !== basename && file.slice(-3) === '.ts'
//     );
//   }),
//   file => {
//     // const model = sequelize.import(path.join(`${__dirname}/models`, file));
//     const model = require(path.join(`${__dirname}/models`, file))(sequelize, Sequelize);
//     database[model.name] = model;
//   },
// );
//
// forEach(keys(database), modelName => {
//   if (database[modelName].associate) {
//     database[modelName].associate(database);
//   }
// });
//
// database.sequelize = sequelize;
// database.Sequelize = Sequelize;
//
// export default database;
