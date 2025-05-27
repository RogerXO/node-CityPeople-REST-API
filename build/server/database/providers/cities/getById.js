"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = getById;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function getById(cityId) {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.cities)
            .select("*")
            .where("id", "=", cityId)
            .first();
        if (result)
            return result;
        return new Error("Cidade não encontrada");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao procurar por esta cidade no banco de dados");
    }
}
