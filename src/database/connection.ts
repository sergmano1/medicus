/* eslint-disable @typescript-eslint/no-var-requires */
import { Model, knexSnakeCaseMappers } from 'objection';

const environment = process.env.NODE_ENV || 'development';
import configuration from '../../knexfile';
export const database = require('knex')({
  ...configuration[environment],
  ...knexSnakeCaseMappers(),
});

export class DatabaseModule {
  async databaseConnection(callback) {
    database
      .raw('SELECT 1')
      .then(() => {
        Model.knex(database);
        console.log('Postgres Connected!');
        callback();
      })
      .catch((error) => {
        console.log(
          '[Fatal] Failed to establish connection to database! Exiting...',
        );
        console.log('DB ERROR', error);
        process.exit(1);
      });
  }
}

export const databaseInstance = new DatabaseModule();
