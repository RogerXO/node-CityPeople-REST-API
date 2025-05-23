"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const ETableNames_1 = require("../../shared/enums/ETableNames");
async function up(knex) {
    return knex.schema
        .alterTable(ETableNames_1.ETableNames.users, (table) => {
        table.index(["email"], "users_email_index0");
    })
        .then(() => console.log(`# Index added to column email from table ${ETableNames_1.ETableNames.users}`));
}
async function down(knex) {
    return knex.schema
        .alterTable(ETableNames_1.ETableNames.users, (table) => {
        table.dropIndex(["email"], "users_email_index");
    })
        .then(() => console.log(`# Index dropped from column email from table ${ETableNames_1.ETableNames.users}`));
}
