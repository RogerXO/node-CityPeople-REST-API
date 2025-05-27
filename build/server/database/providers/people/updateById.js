"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = updateById;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function updateById(personId, person) {
    try {
        if (person.cityId) {
            const [{ count }] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.cities)
                .where("id", "=", person.cityId)
                .count("* as count");
            if (count === 0)
                return new Error("A cidade utilizada para atualizar o registro de pessoa não foi encontrada");
        }
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.people)
            .where("id", "=", personId)
            .update(person);
        if (result > 0)
            return;
        return new Error("Erro ao atualizar pessoa inexistente");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao atualizar pessoa no banco de dados");
    }
}
