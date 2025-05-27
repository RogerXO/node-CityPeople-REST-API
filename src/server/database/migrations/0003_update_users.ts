import type { Knex } from "knex";
import { ETableNames } from "../../shared/enums/ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .alterTable(ETableNames.users, (table) => {
      table.index(["email"], "users_email_index0");
    })
    .then(() =>
      console.log(
        `# Index added to column email from table ${ETableNames.users}`
      )
    );
}

export async function down(knex: Knex) {
  return knex.schema
    .alterTable(ETableNames.users, (table) => {
      table.dropIndex(["email"], "users_email_index");
    })
    .then(() =>
      console.log(
        `# Index dropped from column email from table ${ETableNames.users}`
      )
    );
}
