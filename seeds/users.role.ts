import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users_role').del();

  // Inserts seed entries
  await knex('users_role').insert([
    { id: 1, role: 'doctor' },
    { id: 2, role: 'patient' },
  ]);
}
