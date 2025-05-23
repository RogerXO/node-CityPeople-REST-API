"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function create(user) {
    try {
        const [result] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.users).insert(user).returning("id");
        if (result.id)
            return result.id;
        return new Error("Erro ao cadastrar usuário");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao criar usuário no banco de dados");
    }
}
