"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = getById;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
async function getById(cityId) {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.EtableNames.cidades)
            .select("*")
            .where("id", "=", cityId)
            .first();
        if (result)
            return result;
        return new Error("Esta cidade não existe no Banco de dados");
    }
    catch (error) {
        console.log(error);
        return new Error("Não foi possível encontrar esta cidade");
    }
}
