import type { Knex } from "knex";
import { ETableNames } from "../../shared/enums/ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.users, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name").notNullable().checkLength(">=", 2);
      table.string("email").unique().notNullable().checkLength(">=", 5);
      table.string("password").notNullable().checkLength(">=", 6);

      table.comment("Table used to store users");
    })
    .then(() => console.log(`# Created table ${ETableNames.users}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.users)
    .then(() => console.log(`# Dropped table ${ETableNames.users}`));
}
