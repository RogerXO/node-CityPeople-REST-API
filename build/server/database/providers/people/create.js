"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function create(person) {
    try {
        const [{ count }] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.cities)
            .where("id", "=", person.cityId)
            .count("* as count");
        if (count === 0)
            return new Error("A cidade usada no cadastro não foi encontrada");
        const [result] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.people)
            .insert(person)
            .returning("id");
        if (result.id)
            return result.id;
        return new Error("Erro ao cadastrar pessoa");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao criar pessoa no banco de dados");
    }
}
