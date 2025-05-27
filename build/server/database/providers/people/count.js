"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function count(nameFilter) {
    try {
        const [{ count }] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.people)
            .where("fullName", "like", `%${nameFilter}%`)
            .count("* as count");
        if (Number.isInteger(Number(count)))
            return Number(count);
        return new Error("Erro ao consultar a quantidade total de pessoas registradas");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao consultar a quantidade total de pessoas no banco de dados");
    }
}
