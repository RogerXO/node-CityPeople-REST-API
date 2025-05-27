"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const ETableNames_1 = require("../../shared/enums/ETableNames");
async function up(knex) {
    return knex.schema
        .createTable(ETableNames_1.ETableNames.people, (table) => {
        table.bigIncrements("id").primary().index();
        table.string("fullName").index().notNullable();
        table.string("email").unique().index().notNullable();
        table
            .bigInteger("cityId")
            .index()
            .notNullable()
            .references("id")
            .inTable(ETableNames_1.ETableNames.cities)
            .onUpdate("CASCADE")
            .onDelete("RESTRICT");
        table.comment("Table used to store system's people");
    })
        .then(() => console.log(`# Created table ${ETableNames_1.ETableNames.people}`));
}
async function down(knex) {
    return knex.schema
        .dropTable(ETableNames_1.ETableNames.people)
        .then(() => console.log(`# Dropped table ${ETableNames_1.ETableNames.people}`));
}
