import type { Knex } from "knex";
import { EtableNames } from "../../shared/enums/ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(EtableNames.people, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("fullName").index().notNullable();
      table.string("email").unique().index().notNullable();
      table
        .bigInteger("cityId")
        .index()
        .notNullable()
        .references("id")
        .inTable(EtableNames.cities)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Table used to store system's people");
    })
    .then(() => console.log(`# Created table ${EtableNames.people}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(EtableNames.people)
    .then(() => console.log(`# Dropped table ${EtableNames.people}`));
}
