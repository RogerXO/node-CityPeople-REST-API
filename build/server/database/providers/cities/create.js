"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
async function create(city) {
    try {
        const [result] = await (0, knex_1.Knex)(ETableNames_1.EtableNames.cidades)
            .insert(city)
            .returning("id");
        if (typeof result === "object")
            return result.id;
        else if (typeof result === "number")
            return result;
        return new Error("Erro ao criar cidade no banco");
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao criar cidade no banco");
    }
}
