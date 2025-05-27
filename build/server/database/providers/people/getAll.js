"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
const ETableNames_1 = require("../../../shared/enums/ETableNames");
const services_1 = require("../../../shared/services");
const knex_1 = require("../../knex");
async function getAll(page = services_1.utils.defaultPage, limit = services_1.utils.defaultLimit, nameFilter) {
    try {
        const results = await (0, knex_1.Knex)(ETableNames_1.ETableNames.people)
            .select("*")
            .where("fullName", "like", `%${nameFilter}%`)
            .offset((page - 1) * limit)
            .limit(limit);
        return results;
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao carregar pessoas");
    }
}
