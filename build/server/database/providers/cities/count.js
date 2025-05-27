"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = count;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function count(filterName = "") {
    try {
        const [{ count }] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.cities)
            .where("name", "like", `%${filterName}%`)
            .count("* as count");
        if (Number.isInteger(Number(count)))
            return Number(count);
        return new Error("Erro ao consultar a quantidade total de cidades registradas");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao consultar a quantidade total de cidades no banco de dados");
    }
}
