"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const ETableNames_1 = require("../../shared/enums/ETableNames");
async function up(knex) {
    return knex.schema
        .createTable(ETableNames_1.ETableNames.users, (table) => {
        table.bigIncrements("id").primary().index();
        table.string("name").notNullable().checkLength(">=", 2);
        table.string("email").unique().notNullable().checkLength(">=", 5);
        table.string("password").notNullable().checkLength(">=", 6);
        table.comment("Table used to store users");
    })
        .then(() => console.log(`# Created table ${ETableNames_1.ETableNames.users}`));
}
async function down(knex) {
    return knex.schema
        .dropTable(ETableNames_1.ETableNames.users)
        .then(() => console.log(`# Dropped table ${ETableNames_1.ETableNames.users}`));
}
