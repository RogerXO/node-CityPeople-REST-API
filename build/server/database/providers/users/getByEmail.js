"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByEmail = getByEmail;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const knex_1 = require("../../knex");
async function getByEmail(email) {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.users)
            .select("*")
            .where("email", email)
            .first();
        if (result)
            return result;
        return new Error("Usuário não encontrado");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao consultar o usuário");
    }
}
