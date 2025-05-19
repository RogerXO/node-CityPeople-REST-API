"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const ETableNames_1 = require("../ETableNames");
async function up(knex) {
    return knex.schema
        .createTable(ETableNames_1.EtableNames.cidades, (table) => {
        table.bigIncrements("id").primary().index();
        table.string("name", 60).checkLength("<=", 60).index().notNullable();
        table.comment("Table used to store system's cities");
    })
        .then(() => console.log(`# Created table ${ETableNames_1.EtableNames.cidades}`));
}
async function down(knex) {
    return knex.schema
        .dropTable(ETableNames_1.EtableNames.cidades)
        .then(() => console.log(`# Dropped table ${ETableNames_1.EtableNames.cidades}`));
}
