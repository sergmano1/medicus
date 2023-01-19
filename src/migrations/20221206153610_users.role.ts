import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.hasTable('users_role').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users_role', function (table) {
        table.increments('id');
        table.string('role', 255).notNullable();
      });
    }
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users_role');
}
