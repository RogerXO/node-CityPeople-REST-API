"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = deleteById;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function deleteById(cityId) {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.cities)
            .where("id", "=", cityId)
            .del();
        if (result > 0)
            return;
        return new Error("Erro ao deletar cidade inexistente!");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao deletar cidade!");
    }
}
