import { expandEnvVariables } from 'src/domain/helpers/env.helpers';

expandEnvVariables();
export enum EnvObjects {
  MONGO_OPTIONS = 'MongoOptions',
  POSTGRESS_OPTIONS = 'PostgressOptions',
}

export interface PostgressOptions {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: Array<string>;
  migrations: Array<string>;
  migrationsRun: boolean;
  synchronize: boolean;
  logging: boolean;
}

export interface MongoOptions {
  host: string;
  options: {
    dbName: string;
    auth: {
      user: string;
      password: string;
    };
  };
}

type EnvConfig = {
  PostgressOptions: PostgressOptions;
};

export const configuration = (): EnvConfig => ({
  // MongoOptions: {
  //   host: process.env.MONGO_CLIENT_URL,
  //   options: {
  //     dbName: process.env.MONGO_DB_NAME,
  //     auth: {
  //       user: process.env.MONGO_USER,
  //       password: process.env.MONGO_PASS,
  //     },
  //   },
  // },
  PostgressOptions: {
    type: 'postgres',
    host: process.env.POSTGRESS_CLIENT_URL,
    port: +process.env.POSTGRESS_PORT,
    username: process.env.POSTGRESS_USER,
    password: process.env.POSTGRESS_PASS,
    database: process.env.POSTGRESS_DB_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    migrationsRun: true,
    synchronize: true,
    logging: false,
  },
});
