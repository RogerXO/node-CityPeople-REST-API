"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = getById;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function getById(id) {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.people)
            .select("*")
            .where("id", "=", id)
            .first();
        if (result)
            return result;
        return new Error("Pessoa não encontrada");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao consultar por esta esta pessoa no banco de dados");
    }
}
