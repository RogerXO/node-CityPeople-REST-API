import type { Knex } from "knex";
import { ETableNames } from "../../shared/enums/ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.cities, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name", 60).checkLength("<=", 60).index().notNullable();

      table.comment("Table used to store system's cities");
    })
    .then(() => console.log(`# Created table ${ETableNames.cities}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.cities)
    .then(() => console.log(`# Dropped table ${ETableNames.cities}`));
}
