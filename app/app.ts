import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import map from 'lodash/map';
import { createConnection } from 'typeorm';
import cluster from 'cluster';
import os from 'os';
const serve = require('koa-static');
const koaValidator = require('koa-async-validator');
const koaSwagger = require('koa2-swagger-ui');
const koaBunyanLogger = require('koa-bunyan-logger');

import { config as configJson, IConfigProps } from './config';
import { appRouter } from './routes/routes';
import { logger } from './logger/logger';
import database from './db/database';
import db from './dbSequelizeTS/databaseSTS';

const arrayFromAppDir = `${__dirname}`.split('\\');
export const PWD: string = arrayFromAppDir.slice(0, arrayFromAppDir.length - 1).join('\\');

const numberOfWorkers = os.cpus().length;

console.info('app!!!!!!!', numberOfWorkers, PWD);

const environment = process.env.NODE_ENV || 'development';
// console.info('env', environment, configJson);
let config: IConfigProps;
if (environment === 'development') {
  config = configJson.development;
} else {
  config = configJson.production;
}

if (cluster.isMaster) {

  if (config.useTST) {
    db.authenticate().then(async () => {
      await db.sync();
      console.info('Typescript-sequelize db connected!!');
    }).catch((error) => {
      console.info('Typescript-sequelize db error: ', error);
    });
  } else {
    database.then(() => console.info('DB connected!')).catch(console.error);
  }

// export const server = app.listen(config.port);

  console.log(`Server running on port ${config.port}`);

  console.info(`Master process i running ${process.pid}`);

  // tslint:disable-next-line:no-increment-decrement
  for (let i = 0; i <  numberOfWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => console.log(`Worker ${worker.process.pid} is online`));

  cluster.on('exit', (worker, code, signal) => {
    console.info(`Worker ${worker.process.pid} closed`);

    cluster.fork();
  });

  Object.values(cluster.workers).forEach(worker => {
    // Sending message to worker
    worker.send(`Hello Worker ${worker.id}`);
  });
} else {

  const app = new Koa();

  app.use(koaBody());
  app.use(koaValidator());
  app.use(cors());
  app.use(koaBunyanLogger(logger));
  app.use(koaBunyanLogger.requestLogger());
  app.use(koaBunyanLogger.timeContext());
  app.use(appRouter);
  app.use(serve('public'));
  app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        url: '/swagger.yml',
      },
    }),
  );

  app.listen(config.port);
  const message = `Worker : ${process.pid} started`;
  console.log(message);

  process.on('message', msg => {
    // Getting message from master process
    console.log(`Message from master: ${msg}`);
  });
}
