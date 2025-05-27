import type { Knex } from "knex";
import { ETableNames } from "../../shared/enums/ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.people, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("fullName").index().notNullable();
      table.string("email").unique().index().notNullable();
      table
        .bigInteger("cityId")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.cities)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Table used to store system's people");
    })
    .then(() => console.log(`# Created table ${ETableNames.people}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(ETableNames.people)
    .then(() => console.log(`# Dropped table ${ETableNames.people}`));
}
