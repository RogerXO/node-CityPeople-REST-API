"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = deleteById;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function deleteById(id) {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.people)
            .where("id", "=", id)
            .del();
        if (result > 0)
            return;
        return new Error("Erro ao deletar pessoa");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao deletar pessoa no banco de dados");
    }
}
