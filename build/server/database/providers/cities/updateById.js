"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = updateById;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
async function updateById(cityId, data) {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.EtableNames.cidades)
            .where("id", cityId)
            .update(data);
        if (result > 0)
            return;
        return new Error("Erro ao atualizar cidade inexistente");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao atualizar cidade");
    }
}
