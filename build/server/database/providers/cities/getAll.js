"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
async function getAll(page, limit, filterName, id = 0) {
    try {
        const results = await (0, knex_1.Knex)(ETableNames_1.EtableNames.cidades)
            .select("*")
            .where("id", Number(id))
            .orWhere("name", "like", `%${filterName}%`)
            .offset((page - 1) * limit)
            .limit(limit);
        if (id > 0 && results.every((city) => city.id !== id)) {
            const resultById = await (0, knex_1.Knex)(ETableNames_1.EtableNames.cidades)
                .select("*")
                .where("id", "=", Number(id))
                .first();
            if (resultById)
                return [...results, resultById];
        }
        return results;
    }
    catch (error) {
        console.log(error);
        return new Error("Erro ao carregar cidades");
    }
}
