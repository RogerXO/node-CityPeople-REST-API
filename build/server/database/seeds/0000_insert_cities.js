"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const ETableNames_1 = require("../../shared/enums/ETableNames");
const acreCities = [
    "Acrelândia",
    "Assis Brasil",
    "Brasiléia",
    "Bujari",
    "Capixaba",
    "Cruzeiro do Sul",
    "Epitaciolândia",
    "Feijó",
    "Jordão",
    "Mâncio Lima",
    "Manoel Urbano",
    "Marechal Thaumaturgo",
    "Plácido de Castro",
    "Porto Acre",
    "Porto Walter",
    "Rio Branco",
    "Rodrigues Alves",
    "Santa Rosa do Purus",
    "Sena Madureira",
    "Senador Guiomard",
    "Tarauacá",
    "Xapuri",
];
async function seed(knex) {
    const [{ count }] = await knex(ETableNames_1.ETableNames.cities).count("* as count");
    if (!Number.isInteger(Number(count)) || Number(count) > 0)
        return;
    const citiesToInsert = acreCities.map((city) => ({ name: city }));
    await knex(ETableNames_1.ETableNames.cities).insert(citiesToInsert);
}
