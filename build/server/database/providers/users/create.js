"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const services_1 = require("../../../shared/services");
const knex_1 = require("../../knex");
async function create(user) {
    try {
        const hashedPassword = await services_1.passwordCrypto.hashPassword(user.password);
        const [result] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.users)
            .insert({ ...user, password: hashedPassword })
            .returning("id");
        if (result.id)
            return result.id;
        return new Error("Erro ao cadastrar usuário");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao criar usuário no banco de dados");
    }
}
