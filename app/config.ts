require('dotenv').config();

export interface IConfigProps {
  environment: string;
  port: number;
  dbHost: string;
  databaseUrl: string;
  database: string;
  username: string;
  password: string;
  dbPort: number;
  host: number | string;
  dialect: 'postgres';
  useTST: string;
}

export interface IConfig {
  development: IConfigProps;
  production: IConfigProps;
}

export const config: IConfig = {
  development: {
    environment: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    databaseUrl: process.env.DATABASE_URL,
    dbHost: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dbPort: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    dialect: 'postgres',
    useTST: process.env.USE_TST,
  },
  production: {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 8000,
    databaseUrl: process.env.DATABASE_URL,
    dbHost: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dbPort: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    dialect: 'postgres',
    useTST: process.env.USE_TST,
  },
};

export default config;
