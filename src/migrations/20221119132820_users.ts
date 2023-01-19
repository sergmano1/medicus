import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table
          .integer('role')
          .notNullable()
          .references('id')
          .inTable('users_role');
        table.string('email', 255).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('avatar', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
